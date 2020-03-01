
export interface MessageSender<TMessageSenderXp = any> {
    ID?: string
    Name: string
    MessageTypes: 'OrderDeclined' | 'OrderSubmitted' | 'ShipmentCreated' | 'ForgottenPassword' | 'OrderSubmittedForYourApproval' | 'OrderSubmittedForApproval' | 'OrderApproved' | 'OrderSubmittedForYourApprovalHasBeenApproved' | 'OrderSubmittedForYourApprovalHasBeenDeclined' | 'NewUserInvitation'
    Description?: string
    URL: string
    ElevatedRoles?: 'DevCenter' | 'DevCenterPasswordReset' | 'DevCenterValidateEmail' | 'GrantForAnyRole' | 'ApiClientAdmin' | 'ApiClientReader' | 'AddressAdmin' | 'AddressReader' | 'AdminAddressAdmin' | 'AdminAddressReader' | 'AdminUserAdmin' | 'AdminUserGroupAdmin' | 'AdminUserGroupReader' | 'AdminUserReader' | 'ApprovalRuleAdmin' | 'ApprovalRuleReader' | 'BuyerAdmin' | 'BuyerImpersonation' | 'BuyerReader' | 'BuyerUserAdmin' | 'BuyerUserReader' | 'CatalogAdmin' | 'CatalogReader' | 'CategoryAdmin' | 'CategoryReader' | 'CostCenterAdmin' | 'CostCenterReader' | 'CreditCardAdmin' | 'CreditCardReader' | 'FullAccess' | 'IncrementorAdmin' | 'IncrementorReader' | 'InventoryAdmin' | 'MeAddressAdmin' | 'MeAdmin' | 'MeCreditCardAdmin' | 'MessageConfigAssignmentAdmin' | 'MeXpAdmin' | 'OrderAdmin' | 'OrderReader' | 'OverrideShipping' | 'OverrideTax' | 'OverrideUnitPrice' | 'PasswordReset' | 'PriceScheduleAdmin' | 'PriceScheduleReader' | 'ProductAdmin' | 'ProductAssignmentAdmin' | 'ProductFacetAdmin' | 'ProductFacetReader' | 'ProductReader' | 'PromotionAdmin' | 'PromotionReader' | 'SecurityProfileAdmin' | 'SecurityProfileReader' | 'SetSecurityProfile' | 'ShipmentAdmin' | 'ShipmentReader' | 'Shopper' | 'SpendingAccountAdmin' | 'SpendingAccountReader' | 'SupplierAddressAdmin' | 'SupplierAddressReader' | 'SupplierAdmin' | 'SupplierReader' | 'SupplierUserAdmin' | 'SupplierUserGroupAdmin' | 'SupplierUserGroupReader' | 'SupplierUserReader' | 'UnsubmittedOrderReader' | 'UserGroupAdmin' | 'UserGroupReader' | 'OpenIDConnectReader' | 'OpenIDConnectAdmin' | 'MessageSenderReader' | 'MessageSenderAdmin' | 'XpIndexAdmin' | 'WebhookReader' | 'WebhookAdmin'
    SharedKey: string
    xp?: TMessageSenderXp
}