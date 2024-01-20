import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from 'src/components/spinners/Spinner'
import { useForm } from 'src/hooks/useForm'
import { api } from 'src/services/api'
import { preventDefault } from 'src/utils/ui'

export default function SignUp() {
  const { form, register } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const signUp = useMutation({
    mutationFn: () => api.auth.signUp(form),
    onSuccess: () => navigate('/auth/sign-in'),
  })

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="max-w-[432px] p-8 rounded-lg border border-zinc-800">
        <h1 className="text-4xl font-bold tracking-tighter text-center">
          Share<span className="text-yellow-500">File</span>
        </h1>
        <h1 className="mb-4 text-center">Sign up</h1>
        <form
          onSubmit={preventDefault(() => signUp.mutate())}
          className="mb-4 grid gap-4 grid-cols-2"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              className="bg-transparent py-2 px-4 border border-zinc-800 rounded outline-none transition ease-in-out focus:border-zinc-600"
              {...register('firstName')}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              className="bg-transparent py-2 px-4 border border-zinc-800 rounded outline-none transition ease-in-out focus:border-zinc-600"
              {...register('lastName')}
            />
          </div>
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
            disabled={signUp.isPending}
            className="flex items-center justify-center gap-2 col-span-2 py-2 bg-white text-black rounded disabled:bg-zinc-300"
          >
            <span>Sign up</span>
            {signUp.isPending && <Spinner />}
          </button>
        </form>
        <p className="text-center text-zinc-400">
          Already have an account?{' '}
          <Link className="text-white hover:underline" to="/auth/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
