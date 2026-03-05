export const USER_KEY_ID_STORAGE = 'userLogedID'
export const USER_KEY_TIPO_STORAGE = 'tipoUsuario'
export const USER_KEY_FOTO_STORAGE = 'fotoPerfil'
export const USER_KEY_TOKEN_ACCESS = 'tokenAcceso'
export const USER_KEY_TOKEN_REFRESH = 'tokenRefresco'

export const obtenerUserID = () => {
  const idUsuarioLogueado = sessionStorage.getItem(USER_KEY_ID_STORAGE)
  return idUsuarioLogueado ? + idUsuarioLogueado:-1
}

export const obtenerUserTipo = () => {
  const tipoUsuarioLogueado = sessionStorage.getItem(USER_KEY_TIPO_STORAGE);
  if(tipoUsuarioLogueado == "CHOFER") { return true } else{ return false }
};

export const obtenerUserFotoPerfil = () => {
  const fotoPerfilUsuarioLogueado = sessionStorage.getItem(USER_KEY_FOTO_STORAGE)
  return fotoPerfilUsuarioLogueado ?? undefined
}

export const obtenerUserTokenAccess = () => {
  const tokenAcceso = sessionStorage.getItem(USER_KEY_TOKEN_ACCESS)
  return tokenAcceso ?? undefined;
}

export const obtenerUserTokenRefresh = () => {
  const tokenRefresh = sessionStorage.getItem(USER_KEY_TOKEN_REFRESH)
  return tokenRefresh ?? undefined
}