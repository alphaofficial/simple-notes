import AuthLayout from '@/components/authLayout';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
