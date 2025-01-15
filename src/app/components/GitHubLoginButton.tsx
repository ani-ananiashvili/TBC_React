// src/components/GitHubLoginButton.tsx
import { useAuth } from '../hooks/useAuth'; // Using named import

const GitHubLoginButton = () => {
  const { loginWithGitHub } = useAuth(); // Using named import

  return (
    <button
      type="button"
      onClick={loginWithGitHub}
      className="mt-4 bg-black text-white py-2 px-4 rounded"
    >
      Sign in with GitHub
    </button>
  );
};

export default GitHubLoginButton;
