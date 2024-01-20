import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from 'src/components/spinners/Spinner'
import { useForm } from 'src/hooks/useForm'
import { api } from 'src/services/api'
import { setToken } from 'src/services/api/auth'
import { preventDefault } from 'src/utils/ui'

export default function SignIn() {
  const { form, register } = useForm({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const signIn = useMutation({
    mutationFn: () => api.auth.signIn(form).then(setToken),
    onSuccess: () => navigate('/dashboard'),
  })

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="max-w-[432px] p-8 rounded-lg border border-zinc-800">
        <h1 className="text-4xl font-bold tracking-tighter text-center">
          Share<span className="text-yellow-500">File</span>
        </h1>
        <h1 className="mb-4 text-center">Sign up</h1>
        <form
          onSubmit={preventDefault(() => signIn.mutate())}
          className="mb-4 grid gap-4 grid-cols-2"
        >
          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className="bg-transparent py-2 px-4 border border-zinc-800 rounded outline-none transition ease-in-out focus:border-zinc-600"
              {...register('email')}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="bg-transparent py-2 px-4 border border-zinc-800 rounded outline-none transition ease-in-out focus:border-zinc-600"
              {...register('password')}
            />
          </div>
          <button
            disabled={signIn.isPending}
            className="flex items-center justify-center gap-2 col-span-2 py-2 bg-white text-black rounded disabled:bg-zinc-300"
          >
            <span>Login</span>
            {signIn.isPending && <Spinner />}
          </button>
        </form>
        <p className="text-center text-zinc-400">
          Don't have an account?{' '}
          <Link className="text-white hover:underline" to="/auth/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
