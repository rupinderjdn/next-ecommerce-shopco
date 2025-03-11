import Image from 'next/image'
import LoginForm from '@/components/Login/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Image
            src="/images/Primary_logo.png"
            alt="Trinetra Logo"
            width={200}
            height={80}
            priority
          />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
