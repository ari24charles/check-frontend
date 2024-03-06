declare namespace API {
  type AdminQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    username?: string;
    nickname?: string;
    gender?: number;
    status?: number;
    role?: number;
  };

  type BaseResponseObject = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
    description?: string;
  };

  type IdRequest = {
    id?: number;
  };

  type UserLoginRequest = {
    username?: string;
    password?: string;
  };

  type UserQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    username?: string;
    nickname?: string;
  };

  type UserRegisterRequest = {
    username?: string;
    password?: string;
    check?: string;
    phone?: string;
  };

  type UserUpdateRequest = {
    username?: string;
    password?: string;
    nickname?: string;
    phone?: string;
    email?: string;
    avatarUrl?: string;
    gender?: number;
  };

  type UserVo = {
    id?: number;
    username?: string;
    nickname?: string;
    phone?: string;
    email?: string;
    avatarUrl?: string;
    gender?: number;
    status?: number;
    role?: number;
    createTime?: Date;
  }

  type User = {
    id?: number;
    username?: string;
    password?: string;
    nickname?: string;
    phone?: string;
    email?: string;
    avatarUrl?: string;
    gender?: number;
    status?: number;
    role?: number;
    createTime?: Date;
    updateTime?: Date;
  }
}
