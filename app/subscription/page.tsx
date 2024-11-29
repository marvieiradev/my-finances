import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);

  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="font bold text-2xl">Assinatura</h1>

        <div className="flex gap-6">
          <Card className="w-[458px]">
            <CardHeader className="text-center text-2xl font-semibold">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon className="text-white" />
                <p>Relatórios de IA</p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon className="text-white" />
                <p>Suporte online</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[458px]">
            <CardHeader className="relative text-center text-2xl font-semibold">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-9 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Transações Ilimitadas</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Suporte online personalizado</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
