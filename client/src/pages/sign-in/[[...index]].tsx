import AuthLayout from '@/components/authLayout';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
