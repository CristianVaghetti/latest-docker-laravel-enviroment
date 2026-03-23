import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckIcon, ClipboardIcon, KeyRoundIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ApiTokenController from '@/actions/App/Http/Controllers/Settings/ApiTokenController';
import { index } from '@/actions/App/Http/Controllers/Settings/ApiTokenController';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'API Tokens', href: index.url() },
];

interface Token {
    id: number;
    name: string;
    last_used_at: string | null;
    created_at: string;
}

export default function ApiTokens({ tokens }: { tokens: Token[] }) {
    const { flash } = usePage().props;
    const [dismissedToken, setDismissedToken] = useState<string | null>(null);
    const [copiedText, copy] = useClipboard();

    const modalOpen = !!flash.newToken && flash.newToken !== dismissedToken;

    const { data, setData, post, processing, errors, reset } = useForm({
        token_name: '',
    });

    useEffect(() => {
        if (flash.newToken && flash.newToken !== dismissedToken) {
            copy(flash.newToken);
        }
    }, [flash.newToken, dismissedToken, copy]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(ApiTokenController.store.url(), {
            onSuccess: () => reset(),
        });
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="API Tokens" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-xl font-semibold">API Tokens</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Gerencie os tokens de acesso à API desta aplicação.
                    </p>
                </div>

                {/* Geração de token */}
                <div className="rounded-lg border p-6">
                    <h2 className="mb-4 font-medium">Gerar novo token</h2>
                    <form onSubmit={submit} className="flex items-end gap-3">
                        <div className="flex-1 space-y-1.5">
                            <Label htmlFor="token_name">Nome do token</Label>
                            <Input
                                id="token_name"
                                value={data.token_name}
                                onChange={(e) => setData('token_name', e.target.value)}
                                placeholder="Ex: minha-api, app-mobile..."
                                autoComplete="off"
                            />
                            {errors.token_name && (
                                <p className="text-destructive text-sm">{errors.token_name}</p>
                            )}
                        </div>
                        <Button type="submit" disabled={processing}>
                            <KeyRoundIcon className="mr-2 size-4" />
                            Gerar token
                        </Button>
                    </form>
                </div>

                {/* Lista de tokens */}
                {tokens.length > 0 && (
                    <div className="rounded-lg border">
                        <div className="border-b px-6 py-4">
                            <h2 className="font-medium">Tokens ativos</h2>
                        </div>
                        <ul className="divide-y">
                            {tokens.map((token) => (
                                <li key={token.id} className="flex items-center justify-between px-6 py-4">
                                    <div>
                                        <p className="font-medium">{token.name}</p>
                                        <p className="text-muted-foreground text-sm">
                                            Criado em {formatDate(token.created_at)}
                                            {token.last_used_at && (
                                                <> · Último uso em {formatDate(token.last_used_at)}</>
                                            )}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Modal com o token gerado */}
            <Dialog open={modalOpen} onOpenChange={() => setDismissedToken(flash.newToken ?? null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Token gerado</DialogTitle>
                        <DialogDescription>
                            Copie o token agora. Ele não será exibido novamente.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        <div className="bg-muted flex items-center gap-2 rounded-md p-3">
                            <code className="flex-1 break-all font-mono text-sm">
                                {flash.newToken}
                            </code>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => flash.newToken && copy(flash.newToken)}
                        >
                            {copiedText ? (
                                <>
                                    <CheckIcon className="mr-2 size-4 text-green-600" />
                                    Copiado!
                                </>
                            ) : (
                                <>
                                    <ClipboardIcon className="mr-2 size-4" />
                                    Copiar token
                                </>
                            )}
                        </Button>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setDismissedToken(flash.newToken ?? null)}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
