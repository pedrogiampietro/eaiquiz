export interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string | null;
  points: number;
  level: number;
  worldRank?: number | null;
  localRank?: number | null;
  createdAt: string;
  eaiCoins: number;
  gold: number;
}

export interface AuthContextType {
  user: User | null;
  setUser: any;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: any;
  refreshTokenIfNeeded: any;
  updateUser: any;
}
