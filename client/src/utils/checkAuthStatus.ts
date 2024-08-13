export const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/auth/check-auth", {
      credentials: "include"
    })

    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}