import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading:boolean;
}

export default function LoadingButton({
    children,
    loading,
    ...props
}: LoadingButtonProps) {

return (<Button className="bg-blue-500 hover:to-blue-900" {...props} disabled={props.disabled || loading } >

<span className="flex items-center justify-center gap-1">
    {loading && <Loader2 size={16} className="animate-spin" />}
    {children}
</span>
</Button>
)
}