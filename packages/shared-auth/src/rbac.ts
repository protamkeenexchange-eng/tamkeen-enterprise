export enum Role {
 SUPER_ADMIN='SUPER_ADMIN',
 MANAGER='MANAGER',
 AGENT='AGENT',
 MERCHANT='MERCHANT',
 CUSTOMER='CUSTOMER'
}

export const hasRole=(current:Role, allowed:Role[])=>allowed.includes(current);
