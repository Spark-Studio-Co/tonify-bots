import TonifyLogo from "@/shared/icons/tonify"
import { useGetMe } from "@/entities/auth/queries/use-get-me.query.ts.ts"

export const BalanceTab = () => {
  const { data: user, isLoading } = useGetMe()

  if (isLoading) return null

  return (
    <div className="bg-[#DAE2FC] rounded-full py-[8px] px-3 flex items-center justify-center gap-2">
      <span className="text-main text-[18px] font-bold">{user?.balance?.toFixed(2) ?? "0.00"}</span>
      <TonifyLogo />
    </div>
  )
}
