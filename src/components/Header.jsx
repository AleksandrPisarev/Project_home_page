import { Link, useLocation } from "react-router"
import { useState, useEffect  } from "react"
import { LogIn, UserPlus, LogOut, ShieldCheck, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const UserMenu = () => {
  // 1. Одно состояние для авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [user, setUser] = useState({ name: "", status: "operator" })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-3 px-4 py-2 h-11 rounded-lg border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)]"
        >
          <User className="h-5 w-5 text-cyan-400" />
          <span className="font-medium text-cyan-50 tracking-wide uppercase text-sm">
            {/* Если вошел — показываем имя, если нет — кнопку "Войти" */}
            {isLoggedIn ? user.name : "Войти"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="w-64 bg-[#0f172a]/95 border-white/20 text-slate-200 backdrop-blur-xl" 
        align="end"
        sideOffset={10}
      >
        {!isLoggedIn ? (
          <>
            <DropdownMenuLabel className="text-slate-400 text-[10px] uppercase tracking-[0.2em] py-3">
              Доступ к системе
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            
            <DropdownMenuItem 
              className="py-3 focus:bg-cyan-500/20 focus:text-cyan-300 cursor-pointer"
              onClick={() => { 
                // Имитация успешного входа
                setIsLoggedIn(true); 
                setUser({ name: "Алексей", status: "admin" }); 
              }}
            >
              <LogIn className="mr-3 h-4 w-4 text-cyan-400" />
              <div className="flex flex-col">
                <span className="font-semibold">Авторизация</span>
                <span className="text-[10px] opacity-70">Уже есть аккаунт</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="py-3 focus:bg-white/5 cursor-pointer">
              <UserPlus className="mr-3 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-semibold">Регистрация</span>
                <span className="text-[10px] opacity-70">Новый пользователь</span>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="py-3">
              <div className="flex flex-col space-y-1">
                {/* Показываем статус (роль) из объекта user */}
                <span className="text-xs text-cyan-400 font-mono uppercase tracking-tighter">
                  {user.status}
                </span>
                <span className="text-sm font-bold text-white">
                  {user.name}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            
            {/* Панель управления показываем только если статус "admin" */}
            {user.status === "admin" && (
              <DropdownMenuItem className="py-3 focus:bg-white/5 cursor-pointer">
                <ShieldCheck className="mr-3 h-4 w-4 text-cyan-400" />
                <span>Панель управления</span>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator className="bg-white/10" />
            
            <DropdownMenuItem 
              className="py-3 text-red-400 focus:bg-red-500/10 focus:text-red-300 cursor-pointer"
              onClick={() => {
                setIsLoggedIn(false);
                setUser({ name: "", status: "operator" });
              }}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Выйти из системы</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const NavItem = ({ to, children }) => {
  const location = useLocation();
  
  // В v7 лучше проверять строгое соответствие пути
  const isActive = location.pathname === to;

  return (
    <Button asChild variant="nav" className="!p-0 h-9 shrink-0">
      <Link to={to} className={`relative flex items-center justify-center !px-5 h-full rounded-md transition-all duration-300 font-medium tracking-wide ${
          isActive 
          ? "text-cyan-300 bg-cyan-500/20 " +
            "shadow-[0_0_15px_rgba(34,211,238,0.4),inset_0_0_10px_rgba(34,211,238,0.2)] " +
            " brightness-125" 
          : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
        }`}>
        {children}
      </Link>
    </Button>
  );
};

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
  // Запускаем интервал один раз при загрузке компонента
  const interval = setInterval(() => {setNow(new Date())}, 1000);
  // Очищаем интервал, если компонент удалится (чтобы не было утечек памяти)
  return () => clearInterval(interval)}, []); // Пустые скобки [] значат "запустить только при старте"
  return(
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] w-full flex items-center justify-center 
                      bg-[#0f172a]/60 backdrop-blur-xl border-b border-white/20 shadow-2xl overflow-hidden !px-6">
      <div className="w-full max-w-[1440px] flex items-center justify-between !gap-4 md:!gap-10">
        <nav className="flex items-center !gap-2 md:!gap-4 shrink-0 flex-nowrap">
          <NavItem to="/" end>Главная</NavItem>
          <NavItem to="/analytics">Аналитика</NavItem>
          <NavItem to="/documents">Документы</NavItem>
        </nav>

        <h1 className="hidden min-[1380px]:block shrink-0 text-[0.85rem] font-medium text-white uppercase tracking-[0.25em] text-center whitespace-nowrap !px-4">
          Проект компьютерного зрения по аналитике трафика
        </h1>
        <UserMenu />
        <div className="shrink-0 font-mono text-lg md:text-xl text-cyan-50/90 tabular-nums whitespace-nowrap min-w-fit text-right"> 
          Время: {now.toLocaleTimeString()}
        </div>
      </div>
    </header>
    )
}