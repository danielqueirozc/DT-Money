import { useNavigate } from "react-router-dom"

export function Login() {
    const navigate = useNavigate()

    function handleRedirect() {
        navigate('/register')
    }

    return (
        <section className="min-h-screen flex items-center justify-center">
           <div className="max-w-md w-full space-y-8 flex justify-center flex-col border border-green700 py-8 rounded">
                <h1 className="text-gray100 font-extrabold text-3xl text-center">Faça seu <span className="text-green700">login</span></h1>
                <form className="flex items-center flex-col space-y-8">
                    <div className="flex flex-col space-y-4">
                        <input 
                            type="text" 
                            placeholder="Username"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="w-full bg-transparent border border-gray800 rounded px-4 py-2 text-gray100 placeholder:text-gray400 focus:outline-none focus:ring-2 focus:ring-green700"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button className="bg-green700 font-medium text-white py-2 px-4 rounded hover:bg-green500 transition-all">Entrar</button>
                        <button onClick={handleRedirect} className="text-green700 font-medium hover:text-green500 transition-all">Crie uma conta</button>
                    </div>
                </form>
           </div>
        </section>
    )
}