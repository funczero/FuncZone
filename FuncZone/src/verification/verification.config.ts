export const verificationConfig = {
  roleName: 'Verificado',
  allowBots: false,
  tosRequired: true,
  customMessage: 'Clique abaixo para se verificar e acessar o servidor!',
  buttons: [
    { id: 'verify_basic', label: 'Verificar', style: 'Success' },
    { id: 'verify_tos', label: 'Aceitar Termos', style: 'Primary' }
  ]
};
