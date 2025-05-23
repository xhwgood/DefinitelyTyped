declare var Xrm: Xrm.XrmStatic;

/**
 * Gets the global context.
 * The method provides access to the global context without going through the form context.
 *
 * It is preferreed to use {@link Xrm.Utility.getGlobalContext Xrm.Utility.getGlobalContext()} instead.
 * @see {@link Xrm.Utility.getGlobalContext}
 */
declare function GetGlobalContext(): Xrm.GlobalContext;

interface Window {
    Xrm: Xrm.XrmStatic;
    GetGlobalContext(): Xrm.GlobalContext;
}

/**
 * Xrm Namespace
 * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference External Link: Client API Reference}
 */
declare namespace Xrm {
    /**
     * Static xRM object.
     */
    interface XrmStatic {
        /**
         * Provides a namespace container for the context, data and ui objects.
         * @deprecated Deprecated in v9.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        Page: Page;

        /** Provides navigation-related methods.
         */
        Navigation: Navigation;

        /**
         * Provides a container for useful functions not directly related to the current page.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility External Link: Xrm.Utility (Client API reference)}
         */
        Utility: Utility;

        /**
         * Provides methods to create and manage records in the mobile clients (for phones tablets).
         * @deprecated Use {@link Xrm.WebApi} instead.
         */
        Mobile: Mobile;

        /**
         * Provides a method to display a web page in the side pane of the Customer Engagement form.
         *
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-panel External Link: Xrm.Panel}
         */
        Panel: Panel;

        /**
         * Provides properties and methods to use Web API to create and manage records and execute Web API actions and functions in Customer Engagement.
         *
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi External Link: Xrm.WebApi (Client API reference)}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview External Link: Use the Microsoft Dataverse Web API}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/client-scripting External Link: Apply business logic using client scripting in model-driven apps using JavaScript}
         */
        WebApi: WebApi;

        /**
         * Provides methods to use native device capabilities of mobile devices.
         *
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-device External Link: Xrm.Device (Client API reference)}
         */
        Device: Device;

        /**
         * Provides methods to encode strings.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-encoding External Link: Xrm.Encoding (Client API reference)}
         */
        Encoding: Encoding;

        /**
         * Provides app-related methods.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-app External Link: Xrm.App (Client API reference)}
         */
        App: App;
    }

    /**
     * Client Types for {@link ClientContext.getClient clientContext.getClient()}.
     * @see {@link XrmEnum.Client}
     */
    type Client = "Web" | "Outlook" | "Mobile" | "UnifiedServiceDesk";

    /**
     * Client States for {@link ClientContext.getClientState clientContext.getClientState()}.
     * @see {@link XrmEnum.ClientState}
     */
    type ClientState = "Online" | "Offline";

    /**
     * Display States for setDisplayState() on {@link Controls.ProcessControl.setDisplayState Processes} and {@link Controls.Tab.setDisplayState Tabs}.
     * @see {@link XrmEnum.DisplayState}
     */
    type DisplayState = "collapsed" | "expanded";

    /**
     * The {@link Entity.save Entity}'s Save Mode
     * @see {@link XrmEnum.EntitySaveMode}
     * @see {@link Entity}
     * @see {@link Entity.save}
     */
    type EntitySaveMode = "saveandclose" | "saveandnew";

    /**
     * Form Notification Levels for {@link Ui.setFormNotification formContext.ui.setFormNotification()}.
     * @see {@link XrmEnum.FormNotificationLevel}
     */
    type FormNotificationLevel = "ERROR" | "INFO" | "WARNING";

    /**
     * App Notification Levels for {@link Xrm.App.addGlobalNotification Xrm.App.addGlobalNotification()}.
     * @see {@link XrmEnum.FormNotificationLevel}
     */
    type AppNotificationLevel = 1 | 2 | 3 | 4;

    /**
     * Submit Mode for {@link Attributes.Attribute.setSubmitMode Attributes.Attribute.setSubmitMode()}.
     * @see {@link XrmEnum.SubmitMode}
     */
    type SubmitMode = "always" | "dirty" | "never";

    /**
     * Themes for {@link GlobalContext.getCurrentTheme globalContext.getCurrentTheme()}.
     * @remarks getCurrentTheme() does not work with Dynamics CRM for tablets or in the unified interface.
     * @see {@link XrmEnum.Theme}
     */
    type Theme = "default" | "Office12Blue" | "Office14Silver";

    /**
     * Interface for the client context.
     */
    interface ClientContext {
        /**
         * Returns a value to indicate which client the script is executing in.
         * @returns The client, as either "Web", "Outlook", or "Mobile"
         */
        getClient(): Client;

        /**
         * Gets client's current state.
         * @returns The client state, as either "Online" or "Offline"
         */
        getClientState(): ClientState;

        /**
         * Use this method to get information about the kind of device the user is using.
         */
        getFormFactor(): XrmEnum.ClientFormFactor;

        /**
         * Returns information whether the server is online or offline.
         */
        isOffline(): boolean;

        /**
         * Returns information whether the network is available or not.
         */
        isNetworkAvailable(): boolean;
    }

    /**
     * Returns information about the current organization settings.
     */
    interface OrganizationSettings {
        /**
         * Returns a lookup object containing the ID, name, and entity type of the base currency for the current organization.
         */
        baseCurrency: LookupValue;
        /**
         * Returns the ID of the base currency for the current organization.
         * @deprecated Deprecated in v9.1; use {@link Xrm.OrganizationSettings.baseCurrency globalContext.organizationSettings.baseCurrency} instead to display name along with the ID.
         */
        baseCurrencyId: string;

        /**
         * Returns the default country/region code for phone numbers for the current organization.
         */
        defaultCountryCode: string;

        /**
         * Indicates whether the auto-save option is enabled for the current organization.
         */
        isAutoSaveEnabled: boolean;

        /**
         * Returns the preferred language ID for the current organization.
         */
        languageId: number;

        /**
         * Returns the ID of the current organization.
         */
        organizationId: string;

        /**
         * Returns the unique name of the current organization.
         */
        uniqueName: string;

        /**
         * Indicates whether the Skype protocol is used for the current organization.
         */
        useSkypeProtocol: boolean;

        /**
         * Returns the region of the current organization.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/admin/geo-to-geo-migrations External Link: Geo to geo migrations}
         */
        organizationGeo: string;
    }

    /**
     * Interface for the {@link DateFormattingInfo DateFormattingInfo.calendar} field
     */
    interface Calendar {
        MinSupportedDateTime: Date;
        MaxSupportedDateTime: Date;
        AlgorithmType: number;
        CalendarType: number;
        Eras: number[];
        TwoDigitYearMax: number;
        IsReadOnly: boolean;
    }

    /**
     * Interface for {@link UserSettings UserSettings.dateFormattingInfo} response
     */
    interface DateFormattingInfo {
        AmDesignator: string;
        AbbreviatedDayNames: string[];
        AbbreviatedMonthGenitiveNames: string[];
        AbbreviatedMonthNames: string[];
        CalendarWeekRule: number;
        Calendar: Calendar;
        DateSeparator: string;
        DayNames: string[];
        FirstDayOfWeek: number;
        FullDateTimePattern: string;
        LongDatePattern: string;
        LongTimePattern: string;
        MonthDayPattern: string;
        MonthGenitiveNames: string[];
        MonthNames: string[];
        PmDesignator: string;
        ShortDatePattern: string;
        ShortTimePattern: string;
        ShortestDayNames: string[];
        SortableDateTimePattern: string;
        TimeSeparator: string;
        UniversalSortableDateTimePattern: string;
        YearMonthPattern: string;
    }

    /**
     * Holds information about the current user settings.
     */
    interface UserSettings {
        /**
         * Returns the date formatting information for the current user.
         */
        dateFormattingInfo: DateFormattingInfo;
        /**
         * Returns the ID of the default dashboard for the current user.
         */
        defaultDashboardId: string;
        /**
         * Indicates whether guided help is enabled for the current user.
         */
        isGuidedHelpEnabled: boolean;
        /**
         * Indicates whether high contrast is enabled for the current user.
         */
        isHighContrastEnabled: boolean;
        /**
         * Indicates whether the language for the current user is a right-to-left (RTL) language.
         */
        isRTL: boolean;
        /**
         * Returns the language ID for the current user.
         */
        languageId: number;
        /**
         * Returns a collection of lookup objects containing the GUID and display name of each of the security role or teams that the user is associated with.
         */
        roles: Collection.ItemCollection<LookupValue>;
        /**
         * Returns an array of strings that represent the GUID values of each of the security role privilege that the user is associated with or any teams that the user is associated with.
         */
        securityRolePrivileges: string[];
        /**
         * Returns an array of strings that represent the GUID values of each of the security role that the user is associated with or any teams that the user is associated with.
         * @deprecated Deprecated in v9.1; use {@link Xrm.UserSettings.roles globalContext.userSettings.roles} instead to display names of security roles or teams along with the ID.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        securityRoles: string[];
        /**
         * Returns a lookup object containing the ID, display name, and entity type of the transaction currency for the current user.
         */
        transactionCurrency: LookupValue;
        /**
         * Returns the transaction currency ID for the current user.
         * @deprecated Deprecated in v9.1; use {@link Xrm.UserSettings.transactionCurrency globalContext.userSettings.transactionCurrency} instead to display name along with the ID.
         */
        transactionCurrencyId: string;
        /**
         * Returns the GUID of the SystemUser.Id value for the current user.
         */
        userId: string;
        /**
         * Returns the name of the current user.
         */
        userName: string;
        /**
         * Returns the difference in minutes between the local time and Coordinated Universal Time (UTC).
         */
        getTimeZoneOffsetMinutes(): number;
    }

    /**
     * properties of the current business app in Customer Engagement.
     */
    interface AppProperties {
        appId?: string | undefined;
        displayName?: string | undefined;
        uniqueName?: string | undefined;
        url?: string | undefined;
        webResourceId?: string | undefined;
        webResourceName?: string | undefined;
        welcomePageId?: string | undefined;
        welcomePageName?: string | undefined;
    }

    /**
     * Interface for the xRM application context.
     * @see {@link GetGlobalContext GetGlobalContext()}
     */
    interface GlobalContext {
        /**
         * The client's context instance.
         */
        client: ClientContext;

        /**
         * Returns information about the current organization settings.
         */
        organizationSettings: OrganizationSettings;

        /**
         * Returns information about the current user settings.
         */
        userSettings: UserSettings;

        /**
         * Returns information about the advanced configuration settings for the organization.
         * @param setting Name of the configuration setting.
         * @see {@link XrmEnum.AdvancedConfigSettingOption}
         */
        getAdvancedConfigSetting(setting: "MaxChildIncidentNumber" | "MaxIncidentMergeNumber"): number;

        /**
         * Gets client's base URL for Dynamics CRM
         * @returns The client's base URL
         * @example
         * // For Dynamics CRM On-Premises:               http(s)://server/org
         * // For Dynamics CRM Online:                    https://org.crm.dynamics.com
         * // For Dynamics CRM for Outlook (Offline):     http://localhost:2525
         */
        getClientUrl(): string;

        /**
         * Returns the name of the current business app in Customer Engagement.
         */
        getCurrentAppName(): Async.PromiseLike<string>;

        /**
         * Returns the properties of the current business app in Customer Engagement.
         */
        getCurrentAppProperties(): Async.PromiseLike<AppProperties>;

        /**
         * Returns the URL of the current business app in Customer Engagement.
         * @example
         * // Online        https://**org**.crm.dynamics.com/main.aspx?appid=**GUID**
         * // OnPrem        https://**server**\/**org**\/main.aspx?appid=**GUID**
         * @returns A string containing the url of the current business app.
         */
        getCurrentAppUrl(): string;

        /**
         * Gets current styling theme.
         * @remarks This function does not work with Dynamics CRM for tablets or in the unified interface.
         * @returns The name of the current theme, as either "default", "Office12Blue", or "Office14Silver"
         */
        getCurrentTheme(): Theme;

        /**
         * Gets whether automatic save is enabled.
         * @deprecated Deprecated in v9. Use {@link Xrm.OrganizationSettings.isAutoSaveEnabled globalContext.organizationSettings.isAutoSaveEnabled} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns true if automatic saving is enabled, otherwise false.
         */
        getIsAutoSaveEnabled(): boolean;

        /**
         * Gets organization's LCID (language code).
         * @deprecated Deprecated in v9. Use {@link Xrm.OrganizationSettings.languageId globalContext.organizationSettings.languageId} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns The organization language code.
         * @see {@link https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/available-language-packs-for-windows External Link: Microsoft Locale ID Values}
         */
        getOrgLcid(): number;

        /**
         * Gets organization's unique name.
         * @remarks This value can be found on the Developer Resources page within Dynamics CRM.
         * @deprecated Deprecated in v9. Use {@link Xrm.OrganizationSettings.uniqueName} globalContext.organizationSettings.uniqueName instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns The organization's unique name.
         */
        getOrgUniqueName(): string;

        /**
         * Gets query string parameters.
         * @returns The query string parameters, in a dictionary object representing name and value pairs.
         * @deprecated Deprecated in v9 (Still applicable in Web Client).
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        getQueryStringParameters(): { [index: string]: any };

        /**
         * Returns the difference between the local time and Coordinated Universal Time (UTC).
         * @returns The time zone offset, in minutes.
         */
        getTimeZoneOffsetMinutes(): number;

        /**
         * Gets user's unique identifier.
         * @deprecated Deprecated in v9.  Use {@link Xrm.UserSettings.userId globalContext.userSettings.userId} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns The user's identifier in Guid format.
         * @example Example: "{B05EC7CE-5D51-DF11-97E0-00155DB232D0}"
         */
        getUserId(): string;

        /**
         * Gets user's LCID (language code).
         * @deprecated Deprecated in v9. Use {@link Xrm.UserSettings.languageId globalContext.userSetings.languageId} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns The user's language code.
         * @see {@link https://learn.microsoft.com/en-us/previous-versions/windows/embedded/ms912047(v=winembedded.10) External Link: Microsoft Locale ID Values}
         */
        getUserLcid(): number;

        /**
         * Gets the name of the current user.
         * @deprecated Deprecated in v9. Use {@link Xrm.UserSettings.userName globalContext.userSettings.userName} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns The user's name.
         */
        getUserName(): string;

        /**
         * Gets all user security roles.
         * @deprecated Deprecated in v9.  Use {@link Xrm.UserSettings.roles globalContext.userSettings.roles} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @returns An array of user role identifiers, in Guid format.
         * @example Example: ["cf4cc7ce-5d51-df11-97e0-00155db232d0"]
         */
        getUserRoles(): string[];

        /**
         * Returns the version number of the Dynamics 365 server.
         * @returns The version number
         */
        getVersion(): string;

        /**
         * Returns a boolean value indicating if the Customer Engagement instance is hosted on- premises or online.
         */
        isOnPremise(): boolean;

        /**
         * Prefixes the current organization's unique name to a string; typically a URL path.
         * @param sPath Local pathname of the resource.
         * @returns A path string with the organization name. Format: "/"+ OrgName + sPath
         */
        prependOrgName(sPath: string): string;

        /**
         * Gets the current value of a settings row.
         * @param settingName Name of the setting youd like to receive the value from.
         * @returns The current value of the setting.
         */
        getCurrentAppSetting(settingName: string): string | number | boolean;

        /**
         * Returns the relative URL with the caching token for the specified web resource.
         * @param webResourceName Name of the web resource.
         * @returns  The relative URL, including the caching token, for the specified web resource.
         */
        getWebResourceUrl(webResourceName: string): string;
    }

    /**
     * Interface for value returned from {@link Xrm.Utility.getPageContext Xrm.Utility.getPageContext()}
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getpagecontext#returns External Link: getPageContext (Client API reference)}
     */
    interface PageContext {
        input: EntityFormPageContext | EntityListPageContext;
    }

    /**
     * Interface for `input` property of returned value from {@link Xrm.Utility.getPageContext Xrm.Utility.getPageContext()}
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getpagecontext#entity-form External Link: getPageContext (Client API reference)}
     */
    interface EntityFormPageContext {
        /**
         * The current page type.
         */
        pageType: "entityrecord";
        /**
         * Logical name of the entity currently displayed.
         */
        entityName: string;
        /**
         * ID of the entity record currently displayed in the form.
         */
        entityId?: string | undefined;
        /**
         * The parent record that provides default values based on mapped attribute values.
         */
        createFromEntity?: LookupValue | undefined;
        /**
         * ID of the currently displayed form.
         */
        formId?: string | undefined;
    }

    /**
     * Interface for `input` property of returned value from {@link Xrm.Utility.getPageContext Xrm.Utility.getPageContext()}
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getpagecontext#entity-list External Link: getPageContext (Client API reference)}
     */
    interface EntityListPageContext {
        /**
         * The current page type.
         */
        pageType: "entitylist";
        /**
         * Logical name of the entity currently displayed.
         */
        entityName: string;
        /**
         * ID of the view currently displayed.
         */
        viewId?: string | undefined;
        /**
         * Type of the view currently displayed.
         */
        viewType?: "savedquery" | "userquery" | undefined;
    }

    /**
     * <CrmParameter> used in RibbonDiffXml actions
     * @see {@link https://learn.microsoft.com/en-us/previous-versions/dynamicscrm-2016/developers-guide/gg309332(v=crm.8) External Link: <CrmParameter> (RibbonDiffXml)}
     */
    interface CommandProperties {
        /**
         * The Id value of the Ribbon control that initiated the event.
         */
        SourceControlId: string;

        /**
         * A string that is sent with the command event when a button is clicked.
         */
        CommandValueId: string;

        /**
         * A reference from a control to the Id of a menu item.
         *
         * Most entities will not return a MenuItemId value. Only the following entities will return this value:
         * - BusinessUnit
         * - Connection
         * - CustomerAddress
         * - Equipment
         * - Goal
         * - InvoiceDetail
         * - Mailbox
         * - MailMergeTemplate
         * - PartnerApplication
         * - QueueItem
         * - QuoteDetail
         * - RoutingRuleItem
         * - SalesOrderDetail
         * - ServiceAppointment
         * - SharePointDocumentLocation
         * - SharePointSite
         * - Territory
         */
        MenuItemId: string;
    }

    /**
     * Some <CrmParameter> values pass an EntityReference object:
     * SelectedControlSelectedItemReferences
     * SelectedControlAllItemReferences
     * SelectedControlUnselectedItemReferences
     *
     * Not to be confused with the more commonly used {@link Xrm.LookupValue LookupValue }.
     *
     * @see {@link https://learn.microsoft.com/en-us/previous-versions/dynamicscrm-2016/developers-guide/gg309332(v=crm.8)#remarks External Link: CrmParameter Remarks}
     */
    interface EntityReference {
        /**
         * A string of the GUID Id value for the record.
         */
        Id: string;

        /**
         * A string of the value of the Primary field for the record.
         */
        Name: string;

        /**
         * A string representing the unique name of the entity for the record.
         */
        TypeName: string;

        /**
         * @deprecated Use {@link TypeName} instead. The number value for custom entities will typically be different from organization to organization and the number value cannot be used reliably for custom entities.
         */
        TypeCode: number;
    }

    namespace Events {
        /**
         * Interface for save event arguments.
         */
        interface SaveEventArguments {
            /**
             * @summary Gets save mode, as an integer.
             * @returns The save mode.
             * @description Gets save mode, as an integer.<BR>
             * **Values returned are**:
             * * 1      Save
             * * 2      Save and Close
             * * 59     Save and New
             * * 70     AutoSave (Where enabled; can be used with an OnSave handler to conditionally disable auto-saving)
             * * 58     Save as Completed (Activities)
             * * 5      Deactivate
             * * 6      Reactivate
             * * 47     Assign (All user- or team-owned entities)
             * * 7      Send (Email)
             * * 16     Qualify (Lead)
             * * 15     Disqualify (Lead)
             */
            getSaveMode(): XrmEnum.SaveMode;

            /**
             * Returns a boolean value to indicate if the record's save has been prevented.
             * @returns true if saving is prevented, otherwise false.
             */
            isDefaultPrevented(): boolean;

            /**
             * Prevents the save operation from being submitted to the server.
             * All remaining "on save" handlers will continue execution.
             */
            preventDefault(): void;

            /**
             * Cancels the save operation if the event handler has a script error,
             * returns a rejected promise for an async event handler or the operation times out.
             */
            preventDefaultOnError(): void;
        }

        interface SaveEventArgumentsAsync extends SaveEventArguments {
            /**
             * @summary Call to prevent default 10 second timeout in async OnSave event handlers.
             * @description When using an async save the handler will wait for the promise to be fulfilled.
             * To ensure that a save completes in a timely manner the handler throws a timeout exception after
             * 10 seconds to let you know to tune the async OnSave event for better performance. When the
             * disableAsyncTimeout is set, the timeout for that handler will not be applied. It will continue
             * to wait for that handler's promise to be fulfilled.
             * This should be used with caution as it might affect the performance of the form save.
             * @see {@link https://learn.microsoft.com/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onsave#async-onsave-timeouts External Link: Async onSave timeouts}
             */
            disableAsyncTimeout(): void;
        }

        /**
         * Interface for postsave event arguments
         */

        interface PostSaveEventArguments {
            /**
             * Use this method to know information about a table being saved.
             * It returns the table logical name, record ID, and table name if save was successful.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/save-event-arguments/getentityreference}
             */
            getEntityReference(): LookupValue;

            /** Use this method to know whether the save operation was successful or failed.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/save-event-arguments/getissavesuccess}
             */
            getIsSaveSuccess(): boolean;

            /**
             * Use this method to know the error details on why save failed.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/save-event-arguments/getsaveerrorinfo}
             */
            getSaveErrorInfo(): object;
        }

        /**
         * Interface for process stage change event arguments.
         */
        interface StageChangeEventArguments {
            /**
             * Gets the direction of the stage change.
             * @returns The direction: "next" or "previous"
             */
            getDirection(): ProcessFlow.StageChangeDirection;

            /**
             * Gets the destination stage object
             * @returns The stage object. For switching between entities, returns the previous stage object
             */
            getStage(): ProcessFlow.Stage;

            /**
             * Prevents the stage or status change operation from being submitted to the server.
             */
            preventDefault(): void;
        }

        /**
         * Interface for process stage selected event arguments.
         */
        interface StageSelectedEventArguments {
            /**
             * Gets the selected stage object
             * @returns The stage object
             */
            getStage(): ProcessFlow.Stage;
        }

        /**
         * Interface for process status changed event arguments.
         */
        interface ProcessStatusChangedEventArguments {
            /**
             * Gets the selected stage object
             * @returns The stage object
             */
            getStage(): ProcessFlow.Stage;

            /**
             * Gets the destination process status
             * @returns The process status
             */
            getStatus(): ProcessFlow.ProcessStatus;

            /**
             * Prevents the stage or status change operation from being submitted to the server.
             */
            preventDefault(): void;
        }

        interface LookupTagClickEventArguments {
            /**
             * Gets the selected tag value
             * @returns The lookups TagValue object
             */
            getTagValue(): TagValue;

            /**
             * Prevents the default onClick behaviour from executing.
             * All remaining "onLookupTagClick" handlers will continue execution.
             */
            preventDefault(): void;

            /**
             * Returns a boolean value to indicate if the lookups onClick has been prevented.
             * @returns true if saving is prevented, otherwise false.
             */
            isDefaultPrevented(): boolean;
        }

        /**
         * Interface for the event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/clientapi-execution-context?tabs=pass-execution-context-legacy External Link: Client API execution context}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface EventContext {
            /**
             * Gets the Xrm context.
             * @returns The {@link GlobalContext Xrm context}
             */
            getContext(): GlobalContext;

            /**
             * Gets the handler's depth, which is the order in which the handler is executed.
             * @returns The depth, a 0-based index.
             */
            getDepth(): number;

            /**
             * Gets a reference to the object for which event occurred.
             * @returns The event source.
             */
            getEventSource(): Attributes.Attribute | Controls.Control | Entity;

            /**
             * Gets a reference to the current form context
             * @returns The {@link FormContext form context}
             */
            getFormContext(): FormContext;

            /**
             * @summary Gets the shared variable with the specified key.
             * @param T Generic type parameter.
             * @param key The key.
             * @returns The shared variable.
             * @description Gets the shared variable with the specified key.
             * Used to pass values between handlers of an event.
             */
            getSharedVariable<T>(key: string): T;

            /**
             * @summary Sets a shared variable.
             * @param T Generic type parameter.
             * @param key The key.
             * @param value The value.
             * @description Sets the shared variable with the specified key.
             * Used to pass values between handlers of an event.
             */
            setSharedVariable<T>(key: string, value: T): void;
        }

        /**
         * Form Data OnLoad event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * Subscribe to this event with {@link Data.addOnLoad()}
         * Not to be confused with {@link LoadEventContext}, registered in the designer.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface DataLoadEventContext extends EventContext {
            /**
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs#return-value External Link: getEventArgs (Client API reference)}
             */
            getEventArgs(): DataLoadEventArguments;
        }

        /**
         * Return value of {@link DataLoadEventContext.getEventArgs()}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs#return-value External Link: getEventArgs (Client API reference)}
         */
        interface DataLoadEventArguments {
            getDataLoadState(): XrmEnum.FormDataLoadState;
        }

        /**
         * Synchronous Form OnLoad event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * Asynchronous version see {@link LoadEventContextAsync}
         * Not to be confused with {@link DataLoadEventContext}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onsave#asynchronous-event-handler-support External Link: Form OnSave event: Asynchronous event handler support}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface LoadEventContext extends EventContext {
            /**
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs#return-value External Link: getEventArgs (Client API reference)}
             */
            getEventArgs(): LoadEventArguments;
        }

        /**
         * Return value of {@link LoadEventContext.getEventArgs()}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs#return-value External Link: getEventArgs (Client API reference)}
         */
        interface LoadEventArguments {
            getDataLoadState(): XrmEnum.FormDataLoadState;
        }

        /**
         * Asynchronous Form OnLoad event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * Synchronous version see {@link LoadEventContext}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onsave#asynchronous-event-handler-support External Link: Form OnSave event: Asynchronous event handler support}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface LoadEventContextAsync extends LoadEventContext {
            getEventArgs(): LoadEventArgumentsAsync;
        }

        interface LoadEventArgumentsAsync extends LoadEventArguments {
            /**
             * @summary Call to prevent default 10 second timeout in async OnLoad event handlers.
             * @description When using an async load the handler will wait for the promise to be fulfilled.
             * To ensure that a load completes in a timely manner the handler throws a timeout exception after
             * 10 seconds to let you know to tune the async OnLoad event for better performance. When the
             * disableAsyncTimeout is set, the timeout for that handler will not be applied. It will continue
             * to wait for that handler's promise to be fulfilled.
             * This should be used with caution as it might affect the performance of the form load.
             * @see {@link https://learn.microsoft.com/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onload#async-onload-timeouts External Link: Async onLoad timeouts}
             */
            disableAsyncTimeout(): void;
        }

        /**
         * Synchronous Form OnSave event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * Asynchronous version see {@link SaveEventContextAsync}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onsave External Link: Form OnSave event}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface SaveEventContext extends EventContext {
            /**
             * Gets save-event arguments.
             */
            getEventArgs(): SaveEventArguments;
        }

        /**
         * Asynchronous Form OnSave event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * Synchronous version see {@link SaveEventContext}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onsave#asynchronous-event-handler-support External Link: Form OnSave event: Asynchronous event handler support}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface SaveEventContextAsync extends SaveEventContext {
            getEventArgs(): SaveEventArgumentsAsync;
        }

        /**
         * Synchronous Form OnPostSave event context.
         * In the API documentation, this is sometimes referred to as the executionContext.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/save-event-arguments External Link: Form OnPostSave event}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/execution-context External Link: Execution context (Client API reference)}
         */
        interface PostSaveEventContext extends EventContext {
            /**
             * Gets postsave-event arguments.
             */
            getEventArgs(): PostSaveEventArguments;
        }

        /**
         * Interface for a process stage change event context
         */
        interface StageChangeEventContext extends EventContext {
            /**
             * Gets process stage change event arguments.
             * @returns The event arguments.
             */
            getEventArgs(): StageChangeEventArguments;
        }

        interface StageSelectedEventContext extends EventContext {
            /**
             * Gets process stage selected event arguments.
             * @returns The event arguments.
             */
            getEventArgs(): StageSelectedEventArguments;
        }

        interface ProcessStatusChangedEventContext extends EventContext {
            /**
             * Gets process status changed event arguments.
             * @returns The event arguments.
             */
            getEventArgs(): ProcessStatusChangedEventArguments;
        }

        interface LookupTagClickEventContext extends EventContext {
            /**
             * Gets an object that contains details about the lookup tag clicked
             */
            getEventArgs(): LookupTagClickEventArguments;
        }

        /**
         * Type for a context-sensitive handler.
         * @param context The context.
         */
        type ContextSensitiveHandler = (context: EventContext) => void;

        type LoadEventHandler = (context: LoadEventContext) => void;
        type LoadEventHandlerAsync = (context: LoadEventContextAsync) => void;

        type DataLoadEventHandler = (context: DataLoadEventContext) => void;

        type SaveEventHandler = (context: SaveEventContext) => void;
        type SaveEventHandlerAsync = (context: SaveEventContextAsync) => PromiseLike<void>;

        type PostSaveEventHandler = (context: PostSaveEventContext) => void;

        type ProcessStatusChangeHandler = (context: ProcessStatusChangedEventContext) => void;
        type StageChangeEventHandler = (context: StageChangeEventContext) => void;
        type StageSelectedEventHandler = (context: StageSelectedEventContext) => void;

        type LookupTagClickHandler = (context: LookupTagClickEventContext) => void;

        namespace Attribute {
            type ChangeEventHandler = (context: ChangeEventContext) => void;
            interface ChangeEventContext extends EventContext {}
        }

        namespace GridControl {
            type LoadEventHandler = (context: LoadEventContext) => void;
            interface LoadEventContext extends EventContext {}
        }

        namespace KbSearchControl {
            type PostSearchEventHandler = (context: PostSearchEventContext) => void;
            interface PostSearchEventContext extends EventContext {}

            type ResultOpenedEventHandler = (context: ResultOpenedEventContext) => void;
            interface ResultOpenedEventContext extends EventContext {}

            type SelectionEventHandler = (context: SelectionEventContext) => void;
            interface SelectionEventContext extends EventContext {}
        }
    }

    /**
     * Defines save options for saving the record.
     *
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data/save External Link: save(Client API reference)}
     */
    interface SaveOptions {
        /**
         * Specify a value indicating how the save event was initiated.
         * @remarks
         * For a list of supported values, see the return value of the {@link Xrm.Events.SaveEventArguments.getSaveMode getSaveMode} method.
         *
         * Note that setting the saveMode does not actually take the corresponding action; it is just to provide information to the OnSave event handlers about the reason for the save operation.
         */
        saveMode: XrmEnum.SaveMode;

        /**
         * Indicates whether to use the Book or Reschedule messages rather than the Create or Update messages.
         * Applicable to appointment, recurring appointment, or service activity records.
         * @remarks This property is not supported in Unified Interface.
         */
        UseSchedulingEngine?: boolean | undefined;
    }

    /**
     * Interface for the {@link Xrm.FormContext.data formContext.data} object.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data External Link: formContext.data (Client API reference)}
     */
    interface Data {
        /**
         * Adds a function to be called when form data is loaded.
         * @param handler The function to be executed when the form data loads. The function will be added to the bottom of the event handler pipeline.
         */
        addOnLoad(handler: Events.DataLoadEventHandler): void;

        /**
         * Gets a boolean value indicating whether the form data has been modified.
         * @returns Returns true if the form data has changed; false otherwise.
         */
        getIsDirty(): boolean;

        /**
         * Gets a boolean value indicating whether all of the form data is valid. This includes the main entity and any unbound attributes.
         * @returns Returns true if all of the form data is valid; false otherwise.
         */
        isValid(): boolean;

        /**
         * Asynchronously refreshes data on the form, without reloading the page.
         * @param save true to save the record, after the refresh.
         * @returns Returns an asynchronous promise.
         */
        refresh(save: boolean): Async.PromiseLike<undefined>;

        /**
         * Removes a function to be called when form data is loaded.
         * @param handler The function to be removed when the form data loads.
         */
        removeOnLoad(handler: Events.ContextSensitiveHandler): void;

        /**
         * Asynchronously saves the record.
         * @returns Returns an asynchronous promise.
         */
        save(): Async.PromiseLike<undefined>;

        /**
         * Asynchronously saves the record  with the option to set callback functions to be executed after the save operation is completed.
         * @param saveOptions Options to control how appointment, recurring appointment, or service activity records are processed.
         * @returns Returns an asynchronous promise.
         */
        save(saveOptions: SaveOptions): Async.PromiseLike<undefined>;

        /**
         * Collection of non-entity data on the form.
         * Items in this collection are of the same type as the attributes collection, but they are not attributes of the form entity.
         * In V9 this is only available in the Unified Client
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/attributes External Link: Attributes (Client API reference)}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         * @see {@link Attributes}
         */
        attributes: Collection.ItemCollection<Attributes.Attribute>;

        /**
         * The record context of the form
         * @see {@link Entity formContext.data.entity}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data-entity External Link: formContext.data.entity (Client API reference)}
         */
        entity: Entity;

        /**
         * The process API for {@link ProcessFlow.ProcessManager formContext.ui.process}.
         * @remarks This member may be undefined when Process Flows are not used by the current entity.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data-process External Link: formContext.data.process (Client API reference)}
         */
        process: ProcessFlow.ProcessManager;
    }

    /**
     * Interface for {@link Xrm.Events.EventContext.getFormContext formContext}
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/executioncontext/getformcontext External Link: getFormContext (Client API reference)}
     */
    interface FormContext {
        /**
         * Provides methods to work with the form.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data External Link: formContext.data (Client API reference)}
         */
        data: Data;

        /**
         * Contains properties and methods to retrieve information about the user interface as well as collections for several subcomponents of the form.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui External Link: formContext.ui (Client API reference)}
         */
        ui: Ui;

        /**
         * Gets an attribute matching attributeName.
         * @param T An Attribute type.
         * @param attributeNameOrIndex Name of the attribute.
         * @returns The attribute or null if attribute does not exist.
         */
        getAttribute<T extends Attributes.Attribute = Attributes.Attribute>(
            attributeNameOrIndex: string | number,
        ): T | null;

        /**
         * Gets a collection of attributes using a delegate function or gets all attributes if delegateFunction is not provided.
         * @param delegateFunction A matching delegate function
         * @returns An collection of attributes.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        getAttribute(
            delegateFunction?: Collection.MatchingDelegate<Attributes.Attribute>,
        ): Attributes.Attribute[];

        /**
         * Gets a collection of attributes using a delegate function or gets all attributes if delegateFunction is not provided.
         * @param T An Attribute type.
         * @param delegateFunction A matching delegate function
         * @returns An collection of attributes.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        getAttribute<T extends Attributes.Attribute>(
            delegateFunction?: Collection.MatchingDelegate<Attributes.Attribute>,
        ): T[];

        /**
         * Gets a control by name or index.
         * @param T A Control type
         * @param controlNameOrIndex Name of the control or the control index.
         * @returns The control.
         */
        getControl<T extends Controls.Control>(controlNameOrIndex: string | number): T | null;

        /**
         * Gets a control by name or index.
         * @param controlNameOrIndex  Name of the control or the control index.
         * @returns The control.
         */
        getControl(controlNameOrIndex: string | number): Controls.Control | null;

        /**
         * Gets a collection of controls using a delegate function or gets all controls if delegateFunction is not provided.
         * @param delegateFunction A matching delegate function.
         * @returns An collection of controls.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        getControl(
            delegateFunction?: Collection.MatchingDelegate<Controls.Control>,
        ): Controls.Control[];

        /**
         * Gets a collection of controls using a delegate function or gets all controls if delegateFunction is not provided.
         * @param T A Control type.  There is no guarentee that all control types will match.
         * @param delegateFunction A matching delegate function.
         * @returns An collection of controls.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        getControl<T extends Controls.Control>(
            delegateFunction?: Collection.MatchingDelegate<Controls.Control>,
        ): T[];
    }

    /**
     * Interface for the formContext.ui object.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui External Link: formContext.ui (Client API reference)}
     */
    interface Ui {
        /**
         * Adds a function to be called on the form OnLoad event.
         * The function will be added to the bottom of the event handler pipeline.
         * @see {@link https://learn.microsoft.com/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui/addonload External Link: ui.addOnLoad (Client API reference)}
         */
        addOnLoad(handler: Events.LoadEventHandler | Events.LoadEventHandlerAsync): void;

        /**
         * Displays a form level notification. Any number of notifications can be displayed and will remain until removed using clearFormNotification.
         * The height of the notification area is limited so each new message will be added to the top.
         * @param message The text of the notification message.
         * @param level The level of the notification which defines how the message will be displayed, such as the icon.
         * ERROR: Notification will use the system error icon.
         * WARNING: Notification will use the system warning icon.
         * INFO: Notification will use the system info icon.
         * @param uniqueId Unique identifier for the notification which is used with clearFormNotification to remove the notification.
         * @returns true if it succeeds, otherwise false.
         */
        setFormNotification(message: string, level: FormNotificationLevel, uniqueId: string): boolean;

        /**
         * Clears the form notification described by uniqueId.
         * @param uniqueId Unique identifier.
         * @returns True if it succeeds, otherwise false.
         */
        clearFormNotification(uniqueId: string): boolean;

        /**
         * Closes the form.
         */
        close(): void;

        /**
         * Provides information on how to set the visibility of footer section.
         */
        footerSection: Controls.FooterSection;

        /**
         * Provides information on how to set the visibility of header section.
         */
        headerSection: Controls.HeaderSection;

        /**
         * Gets form type.
         * @returns The form type.
         * @remarks **Values returned are**:
         * * 0  Undefined
         * * 1  Create
         * * 2  Update
         * * 3  Read Only
         * * 4  Disabled
         * * 6  Bulk Edit
         * * Deprecated values are 5 (Quick Create), and 11 (Read Optimized)
         */
        getFormType(): XrmEnum.FormType;

        /**
         * Gets view port height.
         * @returns The view port height, in pixels.
         * @remarks This method does not work with Microsoft Dynamics CRM for tablets.
         */
        getViewPortHeight(): number;

        /**
         * Gets view port width.
         * @returns The view port width, in pixels.
         * @remarks This method does not work with Microsoft Dynamics CRM for tablets.
         */
        getViewPortWidth(): number;

        /**
         * Re-evaluates the ribbon's configured EnableRules.
         * @param refreshAll Indicates whether all the ribbon command bars on the current page are refreshed. If you specify false only the page-level ribbon command bar is refreshed.
         * If you do not specifiy this parameter, by default false is passed.
         * @remarks This method does not work with Microsoft Dynamics CRM for tablets.
         */
        refreshRibbon(refreshAll?: boolean): void;

        /**
         * Removes a function from the form OnLoad event.
         * @see {@link https://learn.microsoft.com/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui/removeonload External Link: ui.removeOnLoad (Client API reference)}
         */
        removeOnLoad(handler: Events.LoadEventHandler | Events.LoadEventHandlerAsync): void;

        /**
         * Sets the name of the table to be displayed on the form.
         * @param name Name of the table to be displayed on the form.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui/setformentityname External Link: setFormEntityName (Client API reference)}
         */
        setFormEntityName(name: string): void;

        /**
         * The business process flow API, used to interact with the business process flow control in a form.
         */
        process: Controls.ProcessControl;

        /**
         * A reference to the collection of controls on the form.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        controls: Collection.ItemCollection<Controls.Control>;

        /**
         * The form selector API.
         * @remarks This API does not exist with Microsoft Dynamics CRM for tablets.
         */
        formSelector: Controls.FormSelector;

        /**
         * The navigation API.
         * @remarks This API does not exist with Microsoft Dynamics CRM for tablets.
         */
        navigation: Controls.Navigation;

        /**
         * A reference to the collection of tabs on the form.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        tabs: Collection.ItemCollection<Controls.Tab>;

        /**
         * A collection of all the quick view controls on a form using the new form rendering engine (also called "turbo forms").
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-quickforms ExternalLink: formContext.ui.quickForms (Client API reference)}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui External Link: formContext.ui (Client API reference)}
         */
        quickForms: Collection.ItemCollection<Controls.QuickFormControl>;
    }

    /**
     * Interface for options used in Xrm.Utility.lookupObjects
     */
    interface LookupOptions {
        /**
         * Indicates whether the lookup allows more than one item to be selected.
         */
        allowMultiSelect?: boolean | undefined;
        /**
         * The default entity type to use.
         */
        defaultEntityType?: string | undefined;
        /**
         * The default view to use.
         */
        defaultViewId?: string | undefined;
        /**
         * Decides whether to display the most recently used(MRU) item.
         * @remarks Available only for Unified Interface.
         */
        disableMru?: boolean | undefined;
        /**
         * The entity types to display.
         */
        entityTypes: string[];
        /**
         * Used to filter the results.
         */
        filters?: LookupFilterOptions[] | undefined;
        /**
         * Indicates the default search term for the lookup control.
         * This is supported only on Unified Interface.
         */
        searchText?: string | undefined;
        /**
         * Indicates whether the lookup control should show the barcode scanner in mobile clients.
         */
        showBarcodeScanner?: boolean | undefined;
        /**
         * The views to be available in the view picker. Only system views are supported.
         */
        viewIds?: string[] | undefined;
    }

    /**
     * Interface for options used in Xrm.Utility.lookupObjects(LookupOptions)  filters
     */
    interface LookupFilterOptions {
        /**
         * The entity type to which to apply this filter.
         */
        entityLogicalName: string;
        /**
         * The FetchXML filter element to apply.
         */
        filterXml: string;
    }

    /**
     * Interface for the Xrm.Utility API
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility External Link: Xrm.Utility (Client API reference)}
     */
    interface Utility {
        /**
         * Closes a progress dialog box.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/closeprogressindicator External Link: closeProgressIndicator (Client API reference)}
         */
        closeProgressIndicator(): void;

        /**
         * Returns the valid state transitions for the specified entity type and state code.
         * @param entityName    The logical name of the entity.
         * @param stateCode     The state code to find out the allowed status transition values.
         * @returns Returns an object with .then() function. The parameter to the delegate is an array of numbers representing the valid status transitions.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getallowedstatustransitions External Link: getAllowedStatusTransitions (Client API reference)}
         */
        getAllowedStatusTransitions(entityName: string, stateCode: number): PromiseLike<number[]>;

        /**
         * Returns the entity metadata for the specified entity.
         * @param entityName The logical name of the entity.
         * @param attributes The attributes to get metadata for.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getentitymetadata External Link: getEntityMetadata}
         */
        getEntityMetadata(entityName: string, attributes?: string[]): Async.PromiseLike<Metadata.EntityMetadata>;

        /**
         * The method provides access to the global context without going through the form context.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getglobalcontext External Link: getGlobalContext (Client API reference)}
         */
        getGlobalContext(): GlobalContext;

        /**
         * Returns the name of the DOM attribute expected by the Learning Path (guided help) Content Designer for identifying UI controls in the model-driven apps forms.
         * An attribute by this name must be added to the UI element that needs to be exposed to Learning Path (guided help).
         * @returns DOM attribute expected by the Learning Path (guided help) Content Designer.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getlearningpathattributename External Link: getLearningPathAttributeName (Client API reference)}
         */
        getLearningPathAttributeName(): string;

        /**
         * Gets the page context as an object representing the page.
         * @returns The method returns an object with the input property. The input property is an object with the following attributes depending on whether you are currently on the entity form or entity list
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/getpagecontext#entity-form External Link: getPageContext (Client API reference)}
         */
        getPageContext(): PageContext;

        /**
         * Returns the localized string for a given key associated with the specified web resource.
         * @param webResourceName The name of the web resource.
         * @param key The key for the localized string.
         * @returns A localized string.
         */
        getResourceString(webResourceName: string, key: string): string;

        /**
         * Invokes an action based on the specified parameters
         * @param name Name of the process action to invoke.
         * @param parameters An object containing input parameters for the action. You define an object using key:value pairs of items, where key is of String type.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/invokeprocessaction External Link: invokeProcessAction (Client API reference)}
         * @see {@link https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/actions External Link: Actions overview}
         * @see {@link https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/create-own-actions External Link: Create your own actions}
         */
        invokeProcessAction<T = any>(name: string, parameters: Collection.Dictionary<any>): Async.PromiseLike<T>;

        /**
         * Opens a lookup control to select one or more items.
         * @param lookupOptions Defines the options for opening the lookup dialog
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/lookupobjects External Link: lookupObjects (Client API reference)}
         */
        lookupObjects(lookupOptions: LookupOptions): Async.PromiseLike<LookupValue[]>;

        /**
         * Refreshes the parent grid containing the specified record.
         * @param lookupOptions The lookup value of the parent object to refresh.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/refreshparentgrid External Link: refreshParentGrid (Client API reference)}
         */
        refreshParentGrid(lookupOptions: LookupValue): void;

        /**
         * Displays a progress dialog with the specified message.
         * Any subsequent call to this method will update the displayed message in the existing progress dialog with the message specified in the latest method call.
         * @param message The message to be displayed in the progress dialog.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/showprogressindicator External Link: showProgressIndicator (Client API reference)}
         */
        showProgressIndicator(message: string): void;

        /**
         * Displays an alert dialog, with an "OK" button.
         * @deprecated Deprecated in v9. Use {@link Xrm.Navigation.openAlertDialog} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @param message The message.
         * @param onCloseCallback The "OK" callback.
         */
        alertDialog(message: string, onCloseCallback: () => void): void;

        /**
         * Displays a confirmation dialog, with "OK" and "Cancel" buttons.
         * @deprecated Deprecated in v9. Use {@link Xrm.Navigation.openConfirmDialog} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @param message The message.
         * @param yesCloseCallback The "OK" callback.
         * @param noCloseCallback The "Cancel" callback.
         */
        confirmDialog(message: string, yesCloseCallback: () => void, noCloseCallback: () => void): void;

        /**
         * Query if 'entityType' is an Activity entity.
         * @deprecated Deprecated in v9. Use {@link Xrm.Utility.getEntityMetadata  Xrm.Utility.getEntityMetadata(entityName, ["IsActivity"])} instead.
         * @remarks The isActivityType method is synchronous so it was suitable for ribbon rules.
         * However, the replacement method, getEntityMetadata, is asynchronous, and is not suitable for ribbon rules.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @param entityType Type of the entity.
         * @returns true if the entity is an Activity, false if not.
         */
        isActivityType(entityType: string): boolean;

        /**
         * Opens quick create.
         * @deprecated Deprecated in v9. Use {@link Xrm.Navigation.openForm} instead with the option {useQuickCreateForm:true}.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @param entityLogicalName  The logical name of the entity to create.
         * @param createFromEntity (Optional) Designates a record that will provide default values based on mapped attribute values.
         * @param parameters (Optional) A dictionary object that passes extra query string parameters to the form. Invalid query string parameters will cause an error.
         * @returns Returns an asynchronous promise.
         */
        openQuickCreate(
            entityLogicalName: string,
            createFromEntity?: LookupValue,
            parameters?: Utility.OpenParameters,
        ): Async.PromiseLike<Async.OpenQuickCreateSuccessCallbackObject>;

        /**
         * Opens an entity form.
         * @deprecated Deprecated in v9. Use {@link Xrm.Navigation.openForm} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @param name The entity's logical name.
         * @param id (Optional) The unique identifier for the record.
         * @param parameters (Optional) A dictionary object that passes extra query string parameters to the form.
         * @param windowOptions (Optional) Options for controlling the window.
         */
        openEntityForm(
            name: string,
            id?: string,
            parameters?: Utility.FormOpenParameters,
            windowOptions?: Utility.WindowOptions,
        ): void;

        /**
         * Opens an HTML Web Resource in a new browser window.
         * @deprecated Deprecated in v9. Use {@link Xrm.Navigation.openWebResource} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @param webResourceName Name of the HTML web resource. Can be used to pass URL parameters.  See Remarks.
         * @param webResourceData (Optional) Data to pass into the Web Resource's data parameter. It is advised to use encodeURIcomponent() to encode the value.
         * @param width (Optional) The width of the new window.
         * @param height (Optional) The height of the new window.
         * @returns A Window reference, containing the opened Web Resource.
         * @remarks This function will not work with Microsoft Dynamics CRM for tablets.<BR>
         * **Valid WebResource URL Parameters**:
         * * typename
         * * type
         * * id
         * * orgname
         * * userlcid
         * * data (identical to this method's webResourceData parameter)
         * * formid
         */
        openWebResource(webResourceName: string, webResourceData?: string, width?: number, height?: number): Window;
    }

    /**
     * Interface for methods to create and manage records in the mobile clients (for phones tablets).
     */
    interface Mobile {
        /**
         * Provides methods to create and manage records in the mobile clients while working in the offline mode.
         * @see {@link https://learn.microsoft.com/en-us/previous-versions/dynamicscrm-2016/developers-guide/mt787123(v=crm.8) External Link: Xrm.Mobile.offline (client-side reference)}
         * @deprecated Use {@link Xrm.WebApi.offline} instead.  Xrm.WebApi.offline is implemented differently than Xrm.Mobile.offline
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        offline: MobileOffline;
    }

    /**
     * Interface for the Mobile.offline methods to create and manage records in the mobile clients while working in the offline mode.
     * @deprecated Use {@link Xrm.WebApi.offline} instead.  Xrm.WebApi.offline is implemented differently than Xrm.Mobile.offline
     * @see {@link https://learn.microsoft.com/en-us/previous-versions/dynamicscrm-2016/developers-guide/mt787123(v=crm.8) External Link: Xrm.Mobile.offline (client-side reference)}
     * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
     */
    interface MobileOffline {
        /**
         * Returns whether an entity is offline enabled.
         * @param entityType The logical name of the entity.
         * @returns True if the entity is offline enabled; otherwise False.
         * @deprecated Use {@link Xrm.WebApi.isAvailableOffline} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        isOfflineEnabled(entityType: string): boolean;

        /**
         * Creates an entity record in mobile clients while working in the offline mode.
         * @param entityType The logical name of the entity.
         * @param data A dictionary object containing key : value pairs for the record to create.
         * @returns Returns an asynchronous promise.
         * @remarks  You cannot create intersect and activity party entities.<BR>
         *           Only the following attribute types are supported in offline mode:<BR>
         *             BigInt, Boolean, Customer, DateTime, Decimal, Double, EntityName<BR>
         *             Integer, Lookup, Memo, Money, Owner, Picklist, String, State<BR>
         *             Status, UniqueIdentifier
         * @deprecated Use {@link Xrm.WebApi.createRecord} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        createRecord(
            entityType: string,
            data: { [attributeName: string]: any },
        ): Async.PromiseLike<Async.OfflineOperationSuccessCallbackObject>;

        /**
         * Retrieves an entity record in mobile clients while working in the offline mode.
         *
         * @param entityType The logical name of the entity.
         * @param id GUID of the record to retrieve.
         * @param options (Optional) OData system query options to retrieve your data. Supports $select and $expand
         * @example <caption>Example options</caption>
         * options: ?$select=name&$expand=primarycontactid($select=contactid,fullname)
         * @returns Returns an asynchronous promise.
         * @remarks  Only $select option can be specified within $expand.<BR>
         *           Only the following attribute types are supported in offline mode:<BR>
         *             BigInt, Boolean, Customer, DateTime, Decimal, Double, EntityName<BR>
         *             Integer, Lookup, Memo, Money, Owner, Picklist, String, State<BR>
         *             Status, UniqueIdentifier
         * @deprecated Use {@link Xrm.WebApi.retrieveRecord} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        retrieveRecord(
            entityType: string,
            id: string,
            options?: string,
        ): Async.PromiseLike<Async.OfflineOperationSuccessCallbackObject>;

        /**
         * Retrieves a collection of entity records in mobile clients while working in the offline mode.
         *
         * @param entityType The logical name of the entity.
         * @param options (Optional) The logical name of the entity
         * @param maxPageSize (Optional) A positive number to indicates the number of entity records to be returned per page.
         * * If you do not specify this parameter, the default value is passed as 5000.
         * * If the number of records being retrieved is more than maxPageSize, an @odata.nextLink property
         * will be returned, and you can use the value of the @odata.nextLink property with a new GET
         * request to return next set of records.
         * @returns Returns an asynchronous promise.
         * @remarks  A maximum of 5000 related records can be retrieved when using $expand.
         * * Only $select option can be specified within $expand.
         * * $skip query option is not supported.
         * * Only the following attribute types are supported in offline mode:<BR>
         *             BigInt, Boolean, Customer, DateTime, Decimal, Double, EntityName<BR>
         *             Integer, Lookup, Memo, Money, Owner, Picklist, String, State<BR>
         *             Status, UniqueIdentifier
         * @deprecated Use {@link Xrm.WebApi.retrieveMultipleRecords} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        retrieveMultipleRecords(
            entityType: string,
            options?: string,
            maxPageSize?: number,
        ): Async.PromiseLike<Array<{ [key: string]: any }>>;

        /**
         * Updates an entity record in mobile clients while working in the offline mode.
         * @param entityType The logical name of the entity.
         * @param id GUID of the record to update.
         * @param data A dictionary object containing key : value pairs for the record to update.
         * @returns Returns an asynchronous promise.
         * @remarks  You cannot update intersect and activity party entities.<BR>
         *           Only the following attribute types are supported in offline mode:<BR>
         *             BigInt, Boolean, Customer, DateTime, Decimal, Double, EntityName<BR>
         *             Integer, Lookup, Memo, Money, Owner, Picklist, String, State<BR>
         *             Status, UniqueIdentifier
         * @deprecated Use {@link Xrm.WebApi.updateRecord} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        updateRecord(
            entityType: string,
            id: string,
            data: { [attributeName: string]: any },
        ): Async.PromiseLike<Async.OfflineOperationSuccessCallbackObject>;

        /**
         * Deletes an entity record in mobile clients while working in the offline mode.
         * @param entityType The logical name of the entity.
         * @param id GUID of the record to delete.
         * @returns Returns an asynchronous promise.
         * @remarks  You cannot delete intersect and activity party entities.
         * @deprecated Use {@link Xrm.WebApi.deleteRecord} instead.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        deleteRecord(entityType: string, id: string): Async.PromiseLike<Async.OfflineOperationSuccessCallbackObject>;
    }

    /**
     * Interface for the Xrm.Panel API
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-panel External Link: Xrm.Panel}
     */
    interface Panel {
        /**
         * Displays the web page represented by a URL in the static area in the side pane, which appears on all pages in the Customer Engagement web client.
         * @param url URL of the page to be loaded in the side pane static area.
         * @param title Title of the side pane static area.
         * @remarks  This method is only supported for the web client.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-panel/loadpanel External Link: loadPanel (Client-side reference)}
         */
        loadPanel(url: string, title: string): void;
    }

    /**
     *  A definition module for asynchronous interface declarations.
     */
    namespace Async {
        /**
         * Object passed to ErrorCallbackDelegate.
         */
        interface ErrorCallbackObject {
            /**
             * The error code.
             */
            errorCode: number;

            /**
             * An error message describing the issue.
             */
            message: string;
        }

        /**
         * Object passed to QuickCreateSuccessCallbackDelegate.
         */
        interface OpenQuickCreateSuccessCallbackObject {
            /**
             * A lookup value which identifies the record which has been created.
             */
            savedEntityReference: LookupValue;
        }

        /**
         * Object passed to OfflineOperationSuccessCallbackDelegate;
         */
        interface OfflineOperationSuccessCallbackObject {
            /**
             * GUID of the record;
             */
            id: string;

            /**
             * Logical name of the entity.
             */
            logicalName: string;
        }

        /**
         * Object passed to OfflineErrorCallbackDelegate.
         */
        interface OfflineErrorCallbackObject extends ErrorCallbackObject {
            /**
             * An internal error message that might contain additional details about the issue.
             */
            debugMessage: string;
        }

        /**
         * Interface for asynchronous promises. Based on JQuery Promise
         */
        interface PromiseLike<T> {
            /**
             * Attaches callbacks for the resolution and/or rejection of the Promise.
             * @param onFulfilled The callback to execute when the Promise is resolved.
             * @param onRejected The callback to execute when the Promise is rejected.
             * @returns A Promise for the completion of which ever callback is executed.
             */
            then<U>(
                onFulfilled?: (value: T) => U | PromiseLike<U>,
                onRejected?: (error: any) => U | PromiseLike<U>,
            ): PromiseLike<U>;
            then<U>(onFulfilled?: (value: T) => U | PromiseLike<U>, onRejected?: (error: any) => void): PromiseLike<U>;

            /**
             * UNDOCUMENTED (Web Client only) Add handlers to be called when the Deferred object is rejected.
             */
            fail<U>(onRejected?: (reason: ErrorResponse) => U | PromiseLike<U>): PromiseLike<U>;

            /**
             * UNDOCUMENTED (Web Client only): Add handlers to be called when the Deferred object is either resolved or rejected.
             */
            always<U>(alwaysCallback: () => U | PromiseLike<U>): PromiseLike<U>;

            /**
             * UNDOCUMENTED (Unified Client only): Add handlers to be called when the Deferred object is rejected.
             */
            catch<U>(onRejected?: (reason: ErrorResponse) => U | PromiseLike<U>): PromiseLike<U>;

            /**
             * UNDOCUMENTED (Unified Client only): Add handlers to be called when the Deferred object is either resolved or rejected.
             */
            finally<U>(finallyCallback: () => U | PromiseLike<U>): PromiseLike<U>;
        }
    }

    /**
     * A definition module for collection interface declarations.
     */
    namespace Collection {
        /**
         * Called for each item in an array
         * @param item The item.
         * @param index Zero-based index of the item array.
         * @returns true if the item matches, false if it does not.
         */
        type MatchingDelegate<T> = (item: T, index?: number) => boolean;

        /**
         * Called for each item in an array
         * @param item The item.
         * @param index Zero-based index of the item array.
         */
        type IterativeDelegate<T> = (item: T, index?: number) => void;

        /**
         * Defines collections that are index-able by string
         * @param Generic type parameter.
         */
        interface Dictionary<T> {
            [key: string]: T;
        }

        /**
         * Defines item collections that are index-able by string
         * @param Generic type parameter.
         */
        type StringIndexableItemCollection<T> = Dictionary<T> & ItemCollection<T>;

        /**
         * Collections are structures to provide access to data that represent an array, but without the ability to modify the data in the array.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        interface ItemCollection<T> {
            /**
             * Applies an operation to all items in this collection.
             * @param delegate An iterative delegate function
             */
            forEach(delegate: IterativeDelegate<T>): void;

            /**
             * Gets the item given by key or index.
             * @param itemNameOrNumber The item name or item number to get.
             * @returns The T matching the key itemName or the T in the itemNumber-th place.
             */
            get<TSubType extends T>(itemNameOrNumber: string | number): TSubType;

            /**
             * Gets the item given by key or index.
             * @param itemNameOrNumber The item name or item number to get.
             * @returns The T matching the key itemName or the T in the itemNumber-th place.
             */
            get(itemNameOrNumber: string | number): T | null;

            /**
             * Gets the item using a delegate matching function or the entire array of T if delegate is not provided.
             * @param delegate A matching delegate function
             * @returns A T[] whose members have been validated by delegate or a entire array of T[]
             */
            get(delegate?: MatchingDelegate<T>): T[];

            /**
             * Gets the length of the collection.
             * @returns The length.
             */
            getLength(): number;
        }
    }

    /**
     * Interface for Page context
     * @deprecated Use {@link Xrm.Events.EventContext.getFormContext formContext} instead.
     * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}a
     */
    interface Page extends FormContext {
        /**
         * Provides methods to retrieve information specific to an organization, a user, or parameters passed to a page.
         * @deprecated Deprecated in v9.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         */
        context: GlobalContext;
    }

    /**
     * Xrm.Page namespace has been deprecated
     * @deprecated Use {@link Xrm.Events.EventContext.getFormContext formContext} instead.
     * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
     */
    namespace Page {
        /**
         * @deprecated Use {@link Xrm.Controls.AddControlNotificationOptions} instead.
         */
        interface AddControlNotificationOptions extends Controls.AddControlNotificationOptions {}

        /**
         * Interface to define the actions on a control notification
         * @deprecated Use {@link Xrm.Controls.ControlNotificationAction} instead.
         */
        interface ControlNotificationAction extends Controls.ControlNotificationAction {}

        /**
         * Interface for an entity's form selector item.
         * @deprecated Use {@link Xrm.Controls.FormItem} instead.
         */
        interface FormItem extends Controls.FormItem {}

        /**
         * Interface for the form selector API.
         * @deprecated Use {@link Xrm.Controls.FormSelector} instead.
         */
        interface FormSelector extends Controls.FormSelector {}

        /**
         * Interface for Xrm.Page.ui.navigation.
         * @deprecated Use {@link Xrm.Controls.Navigation} instead.
         */
        interface Navigation extends Controls.Navigation {}

        /**
         * Interface for a navigation item.
         * @see {@link UiStandardElement}
         * @see {@link UiFocusable}
         * @deprecated Use {@link Xrm.Controls.NavigationItem} instead.
         */
        interface NavigationItem extends Controls.NavigationItem {}

        /**
         * Constants to use with the addNotification method of form controls
         * @deprecated Use {@link Xrm.Controls.NotificationLevel} instead.
         */
        type NotificationLevel = Controls.NotificationLevel;
        /**
         * Requirement Level for Xrm.Page.Attribute.getRequiredLevel() and Xrm.Page.Attribute.setRequiredLevel().
         * @deprecated Use {@link Xrm.Attributes.RequirementLevel} instead.
         */
        type RequirementLevel = Attributes.RequirementLevel;

        /**
         * Save Modes for Xrm.Page.Entity.save().
         * @deprecated Use {@link Xrm.EntitySaveMode} instead.
         */
        type SaveMode = EntitySaveMode;

        /**
         * Status for Xrm.Page.Stage.getStatus().
         * @deprecated Use {@link Xrm.ProcessFlow.StageStatus} instead.
         */
        type StageStatus = ProcessFlow.StageStatus;

        /**
         * Status for Xrm.Page.Process.getStatus().
         * @deprecated Use {@link Xrm.ProcessFlow.ProcessStatus} instead
         */
        type ProcessStatus = ProcessFlow.ProcessStatus;

        /**
         * Submit Mode for Xrm.Page.Attribute.getSubmitMode() and Xrm.Page.Attribute.setSubmitMode().
         * @deprecated Use {@link Xrm.SubmitMode} instead.
         */
        type SubmitMode = Xrm.SubmitMode;

        /**
         * Control type for Xrm.Page.ui.QuickForm.getControlType().
         * @deprecated Use {@link Xrm.Controls.ControlQuickFormType} instead.
         */
        type ControlQuickFormType = Controls.ControlQuickFormType;

        /**
         * Control types for Xrm.Page.Control.getControlType().
         * @deprecated Use {@link Xrm.Controls.ControlType} instead.
         */
        type ControlType = Controls.ControlType;

        /**
         * Date attribute formats for Xrm.Page.Attribute.getFormat(), used by DateAttribute.
         * @deprecated Use {@link Xrm.Attributes.DateAttributeFormat} instead.
         */
        type DateAttributeFormat = Attributes.DateAttributeFormat;

        /**
         * Integer attribute formats for Xrm.Page.Attribute.getFormat(), used by NumberAttribute.
         * @deprecated Use {@link Xrm.Attributes.IntegerAttributeFormat} instead.
         */
        type IntegerAttributeFormat = Attributes.IntegerAttributeFormat;

        /**
         * OptionSet attribute formats for Xrm.Page.Attribute.getFormat(), used by OptionSetAttribute.
         * @deprecated Use {@link Xrm.Attributes.OptionSetAttributeFormat} instead.
         */
        type OptionSetAttributeFormat = Attributes.OptionSetAttributeFormat;

        /**
         * String attribute formats for Xrm.Page.Attribute.getFormat(), used by StringAttribute.
         * @deprecated Use {@link Xrm.Attributes.StringAttributeFormat} instead.
         */
        type StringAttributeFormat = Attributes.StringAttributeFormat;

        /**
         * Attribute types for Xrm.ui.ProcessMonitor Xrm.Page.Attribute.setDisplayState().
         * @deprecated Use {@link Xrm.Attributes.AttributeType} instead.
         */
        type AttributeType = Attributes.AttributeType;

        /**
         * Direction types for a process stage change event
         * @deprecated Use {@link Xrm.ProcessFlow.StageChangeDirection} instead.
         */
        type StageChangeDirection = ProcessFlow.StageChangeDirection;

        /**
         * Attribute formats for Xrm.Page.Attribute.getFormat().
         * @deprecated Use {@link Xrm.Attributes.AttributeFormat} instead.
         */
        type AttributeFormat = Attributes.AttributeFormat;

        /**
         * Interface for a CRM Business Process Flow instance.
         * @deprecated Use {@link Xrm.ProcessFlow.Process} instead.
         */
        interface Process extends ProcessFlow.Process {}

        /**
         * Interface for CRM Business Process Flow stages.
         * @deprecated Use {@link Xrm.ProcessFlow.Stage} instead.
         */
        interface Stage extends ProcessFlow.Stage {}

        /**
         * Interface for CRM Business Process Flow steps.
         * @deprecated Use {@link Xrm.ProcessFlow.Step} instead.
         */
        interface Step extends ProcessFlow.Step {}

        /**
         * Interface for the event context.
         * @deprecated Use {@link Xrm.Events.EventContext} instead.
         */
        interface EventContext extends Events.EventContext {}

        /**
         * Interface for a save event context
         * @deprecated Use {@link Xrm.Events.SaveEventContext} instead.
         */
        interface SaveEventContext extends Events.SaveEventContext {}

        /**
         * Interface for a process stage change event context
         * @deprecated Use {@link Xrm.Events.StageChangeEventContext} instead.
         */
        interface StageChangeEventContext extends Events.StageChangeEventContext {}

        /**
         * Interface for a process stage select event context
         * @deprecated  Use {@link Xrm.Events.StageSelectedEventContext} instead.
         */
        interface StageSelectedEventContext extends Events.StageSelectedEventContext {}

        /**
         * Type for a context-sensitive handler.
         * @param context The context.
         * @deprecated Use {@link Xrm.Events.ContextSensitiveHandler} instead.
         */
        type ContextSensitiveHandler = Events.ContextSensitiveHandler;

        /**
         * Type for a process status change handler.
         * @param status The process status.
         * @deprecated Use {@link Xrm.Events.ProcessStatusChangeHandler} instead.
         */
        type ProcessStatusChangeHandler = Events.ProcessStatusChangeHandler;

        /**
         * Interface for UI elements with labels.
         * @deprecated Use {@link Xrm.Controls.UiLabelElement} instead.
         */
        interface UiLabelElement extends Controls.UiLabelElement {}

        /**
         * Interface for UI elements which can have the visibility value read.
         * @deprecated Use {@link Xrm.Controls.UiCanGetVisibleElement} instead.
         */
        interface UiCanGetVisibleElement extends Controls.UiCanGetVisibleElement {}

        /**
         * Interface for UI elements which can have the visibility value updated.
         * @deprecated Use {@link Xrm.Controls.UiCanSetVisibleElement} instead.
         */
        interface UiCanSetVisibleElement extends Controls.UiCanSetVisibleElement {}

        /**
         * Base interface for standard UI elements.
         * @deprecated Use {@link Xrm.Controls.UiStandardElement} instead.
         */
        interface UiStandardElement extends Controls.UiStandardElement {}

        /**
         * Interface for focusable UI elements.
         * @deprecated Use {@link Xrm.Controls.UiFocusable} instead.
         */
        interface UiFocusable extends Controls.UiFocusable {}

        /**
         * Interface for controls which methods provide immediate feedback or take actions as user types in a control.
         * Contains methods which can be used to perform data validations in a control even before the user commits (saves) the value in a form.
         * @deprecated Use {@link Xrm.Controls.UiKeyPressable} instead.
         */
        interface UiKeyPressable extends Controls.UiKeyPressable {}

        /**
         * Interface for Result value of AutoCompleteResultSet
         * @deprecated Use {@link Xrm.Controls.AutoCompleteResult} instead.
         */
        interface AutoCompleteResult extends Controls.AutoCompleteResult {}

        /**
         * Interface for command of AutoCompleteResultSet.  This is displayed at the bottom of the auto complete view
         * @deprecated Use {@link Xrm.Controls.AutoCompleteCommand} instead.
         */
        interface AutoCompleteCommand extends Controls.AutoCompleteCommand {}

        /**
         * Interface for showAutoComplete argument
         * @deprecated Use {@link Xrm.Controls.AutoCompleteResultSet} instead.
         */
        interface AutoCompleteResultSet extends Controls.AutoCompleteResultSet {}

        /**
         * Interface for a Lookup value.
         * @deprecated Use {@link Xrm.LookupValue} instead.
         */
        interface LookupValue extends Xrm.LookupValue {}

        /**
         * Interface for an OptionSet value.
         * @deprecated Use {@link Xrm.OptionSetValue} instead.
         */
        interface OptionSetValue extends Xrm.OptionSetValue {}

        /**
         * Interface for a privilege.
         * @deprecated Use {@link Xrm.Privilege} instead.
         */
        interface Privilege extends Xrm.Privilege {}

        /**
         * Interface for an Entity attribute.
         * @deprecated Use {@link Xrm.Attributes.Attribute} instead.
         */
        interface Attribute extends Attributes.Attribute {}

        /**
         * Interface for a Number attribute.
         * @see {@link Attribute}
         * @deprecated Use {@link Xrm.Attributes.NumberAttribute} instead.
         */
        interface NumberAttribute extends Attributes.NumberAttribute {}

        /**
         * Interface for a String attribute.
         * @see {@link Attribute}
         * @deprecated Use {@link Xrm.Attributes.StringAttribute} instead.
         */
        interface StringAttribute extends Attributes.StringAttribute {}

        /**
         * Common interface for enumeration attributes (OptionSet and Boolean).
         * @see {@link Attribute}
         * @deprecated Use {@link Xrm.Attributes.EnumAttribute} instead.
         */
        interface EnumAttribute extends Attributes.EnumAttribute<number | boolean> {}

        /**
         * Interface for a Boolean attribute.
         * @see {@link EnumAttribute}
         * @deprecated Use {@link Xrm.Attributes.BooleanAttribute} instead.
         */
        interface BooleanAttribute extends Attributes.BooleanAttribute {}

        /**
         * Interface for a Date attribute.
         * @see {@link Attribute}
         * @deprecated Use {@link Xrm.Attributes.DateAttribute} instead.
         */
        interface DateAttribute extends Attributes.DateAttribute {}

        /**
         * Interface an OptionSet attribute.
         * @see {@link EnumAttribute}
         * @deprecated Use {@link Xrm.Attributes.OptionSetAttribute} instead.
         */
        interface OptionSetAttribute extends Attributes.OptionSetAttribute {}

        /**
         * Interface a Lookup attribute.
         * @see {@link Attribute}
         * @deprecated Use {@link Xrm.Attributes.LookupAttribute} instead.
         */
        interface LookupAttribute extends Attributes.LookupAttribute {}

        /**
         * Interface for the form's record context, Xrm.Page.data.entity
         * @deprecated Use {@link Xrm.Entity} instead.
         */
        interface Entity extends Xrm.Entity {}

        /**
         * Interface for save event arguments.
         * @deprecated Use {@link Xrm.Events.SaveEventContext} instead.
         */
        interface SaveEventArguments extends Events.SaveEventContext {}

        /**
         * Interface for process stage change event arguments.
         * @deprecated Use {@link Xrm.Events.StageChangeEventArguments} instead.
         */
        interface StageChangeEventArguments extends Events.StageChangeEventArguments {}

        /**
         * Interface for process stage selected event arguments.
         * @deprecated Use {@link Xrm.Events.StageSelectedEventArguments} instead.
         */
        interface StageSelectedEventArguments extends Events.StageSelectedEventArguments {}

        /**
         * Interface for Xrm.Page.ui controls.
         * @see {@link UiLabelElement}
         * @see {@link UiCanGetVisibleElement}
         * @deprecated Use {@link Xrm.Controls.Control} instead.
         */
        interface Control extends Controls.Control {}

        /**
         * Interface for a standard control.
         * @see {@link Control}
         * @deprecated Use {@link Xrm.Controls.StandardControl} instead.
         */
        interface StandardControl extends Controls.StandardControl {}

        /**
         * Interface for Auto Lookup Control.
         * This is not an Entity Lookup, but a control that supports AutoComplete / KeyPress Events (Text or Number)
         * @remarks This interface is not supported for CRM mobile clients (phones or tablets) and the interactive service hub.  It is only available for Updated entities.
         * @see {@link StandardControl}
         * @deprecated Use {@link Xrm.Controls.AutoLookupControl} instead.
         */
        interface AutoLookupControl extends Controls.AutoLookupControl {}

        /**
         * Interface for a String control.
         * @see {@link StandardControl}
         * @deprecated Use {@link Xrm.Controls.StringControl} instead.
         */
        interface StringControl extends Controls.StringControl {}

        /**
         * Interface for a Number control.
         * @see {@link StandardControl}
         * @deprecated Use {@link Xrm.Controls.NumberControl} instead.
         */
        interface NumberControl extends AutoLookupControl {}

        /**
         * Interface for a Date control.
         * @see {@link StandardControl}
         * @deprecated Use {@link Xrm.Controls.DateControl} instead.
         */
        interface DateControl extends StandardControl {}

        /**
         * Interface for a Lookup control.
         * @see {@link StandardControl}
         * @deprecated Use {@link Xrm.Controls.LookupControl} instead.
         */
        interface LookupControl extends Controls.LookupControl {}

        /**
         * Interface for an OptionSet control.
         * @see {@link StandardControl}
         * @deprecated Use {@link Xrm.Controls.OptionSetControl} instead.
         */
        interface OptionSetControl extends Controls.OptionSetControl {}

        /**
         * Interface for a CRM grid control.
         *
         * @see {@link Control}
         * @deprecated  Use {@link Xrm.Controls.GridControl} instead.
         */
        interface GridControl extends Controls.GridControl {}

        /**
         * Interface for a framed control, which is either a Web Resource or an Iframe.
         * @see {@link Control}
         * @remarks     An Iframe control provides additional methods, so use {@link IframeControl} where
         *              appropriate.  Silverlight controls should use {@link SilverlightControl}.
         * @deprecated  Use {@link Xrm.Controls.FramedControl} instead.
         */
        interface FramedControl extends Controls.FramedControl {}

        /**
         * Interface for an Iframe control.
         * @see {@link FramedControl}
         * @deprecated  Use {@link Xrm.Controls.IframeControl} instead.
         */
        interface IframeControl extends Controls.IframeControl {}

        /**
         * Interface for a Silverlight control.
         * @see {@link Control}
         * @deprecated Use {@link Xrm.Controls.SilverlightControl} instead.
         */
        interface SilverlightControl extends Controls.SilverlightControl {}

        /**
         * Interface for a Timeline control.
         * @see {@link Control}
         * @deprecated Use {@link Xrm.Controls.TimelineWall} instead.
         */
        interface TimelineWall extends Controls.TimelineWall {}

        /**
         * Interface for a form tab.
         * @see {@link UiStandardElement}
         * @see {@link UiFocusable}
         * @deprecated Use {@link Xrm.Controls.Tab} instead.
         */
        interface Tab extends Controls.Tab {}

        /**
         * Interface for a form section.
         * @see {@link UiStandardElement}
         * @deprecated Use {@link Xrm.Controls.Section} instead.
         */
        interface Section extends Controls.Section {}

        /**
         * Module for the Xrm.Page.data API.
         * @deprecated Use {@link Xrm.FormContext.data formContext.data} instead.
         */
        namespace data {
            /**
             * Interface for the Xrm.Page.data.process API.
             * @deprecated Use {@link Xrm.ProcessFlow.ProcessManager} instead.
             */
            interface ProcessManager extends ProcessFlow.ProcessManager {}

            /**
             * Called when method to get active processes is complete
             * @param status The result of the get active processes operation.
             * @remarks **Returns object with the following key-value pairs**:
             * * CreatedOn
             * * ProcessDefinitionID
             * * ProcessDefinitionName
             * * ProcessInstanceID
             * * ProcessInstanceName
             * * StatusCodeName
             * @deprecated Use {@link Xrm.ProcessFlow.GetProcessInstancesDelegate} instead.
             */
            type GetProcessInstancesDelegate = ProcessFlow.GetProcessInstancesDelegate;

            /**
             * Called when method to set active process is complete
             * @param status The result of the set active process operation.
             * @remarks **Values returned are**:
             * * success        (The operation succeeded.)
             * * invalid        (The processInstanceId isn’t valid or the process isn’t enabled.)
             * @deprecated Use {@link Xrm.ProcessFlow.SetProcessInstanceDelegate} instead.
             */
            type SetProcessInstanceDelegate = ProcessFlow.SetProcessInstanceDelegate;

            /**
             * Called when process change methods have completed.
             * @param status The result of the process change operation.
             * @remarks **Values returned are**:
             * * success        (The operation succeeded.)
             * * crossEntity    (The previous stage is for a different entity.)
             * * beginning      (The active stage is the first stage of the active path.)
             * * invalid        (The operation failed because the selected stage isn’t the same as the active stage.)
             * * unreachable    (The stage exists on a different path.)
             * @deprecated Use {@link Xrm.ProcessFlow.ProcessCallbackDelegate} instead.
             */
            type ProcessCallbackDelegate = ProcessFlow.ProcessCallbackDelegate;

            /**
             * Called when process set status method has completed.
             * @param status The new status of the process instance
             * @remarks **Values returned are**:
             * * active
             * * aborted
             * * finished
             * @deprecated Use {@link Xrm.ProcessFlow.ProcessSetStatusDelegate} instead.
             */
            type ProcessSetStatusDelegate = ProcessFlow.ProcessSetStatusDelegate;

            /**
             * Represents a key-value pair, where the key is the Process Flow's ID, and the value is the name thereof.
             * @deprecated Use {@link Xrm.ProcessFlow.ProcessDictionary} instead.
             */
            interface ProcessDictionary extends ProcessFlow.ProcessDictionary {}
        }

        /**
         * Contains properties and methods to retrieve information about the user interface as well as collections for several subcomponents of the form.
         * @deprecated Use {@link Xrm.FormContext.ui formContext.ui} instead.
         */
        namespace ui {
            /**
             * Form Notification Levels for Xrm.Ui.setFormNotification().
             * @deprecated Use {@link Xrm.FormNotificationLevel} instead.
             */
            type FormNotificationLevel = Xrm.FormNotificationLevel;

            /**
             * Display States for Xrm.ui.ProcessMonitor.setDisplayState().
             * @deprecated Use {@link Xrm.DisplayState} instead.
             */
            type DisplayState = Xrm.DisplayState;

            /**
             * Interface for Xrm.Page.ui.process API
             * @deprecated Use {@link Xrm.Controls.ProcessControl} instead.
             */
            interface ProcessManager extends Controls.ProcessControl {}

            /**
             * Interface for a grid.  Use Grid methods to access information about data in the grid. Grid is returned by the
             * GridControl.getGrid method.
             * @deprecated Use {@link Xrm.Controls.Grid} instead.
             */
            interface Grid extends Controls.Grid {}

            /**
             * Interface for a grid row.  Use the GridRow.getData method to access the GridRowData. A collection of GridRow is
             * returned by Grid.getRows and Grid.getSelectedRows methods.
             * In V9 - this is essentailly a form context.
             * @deprecated Use {@link Xrm.Controls.Grid.GridRow} instead.
             */
            interface GridRow extends Controls.Grid.GridRow {}

            /**
             * Interface for grid row data.  Use the GridRowData.getEntity method to access the GridEntity. GridRowData is
             * returned by the GridRow.getData method.
             * @deprecated Use {@link Xrm.Controls.Grid.GridRowData} instead.
             */
            interface GridRowData extends Controls.Grid.GridRowData {}

            /**
             * Interface for a grid entity.  Use the GridEntity methods to access data about the specific records in the rows.
             * GridEntity is returned by the GridRowData.getEntity method.
             * @deprecated Use {@link Xrm.Controls.Grid.GridRowData} instead.v
             */
            interface GridEntity extends Controls.Grid.GridEntity {}

            /**
             * Interface for the view selector.  Use the ViewSelector methods to get or set information about the view selector
             * of the grid control.
             * @deprecated Use {@link Xrm.Controls.ViewSelector} instead.
             */
            interface ViewSelector extends Controls.ViewSelector {}

            /**
             * Interface for a view selector item. This object contains data that identifies a view. Use this as a parameter to
             * the ViewSelector.setCurrentView method.
             * @deprecated Use {@link Xrm.Controls.ViewSelectorItem} instead.
             */
            interface ViewSelectorItem extends Controls.ViewSelectorItem {}

            /**
             * Interface for a quick view control instance on a form.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-quickforms External Link: formContext.ui.quickForms (client-side reference)}
             * @deprecated Use {@link Xrm.Controls.ViewSelectorItem} instead.
             */
            interface QuickForm extends Controls.QuickFormControl {}
        }
    }

    /**
     * Interface for a Lookup value.
     */
    interface LookupValue {
        /**
         * The identifier.
         */
        id: string;

        /**
         * The name
         */
        name?: string | undefined;

        /**
         * Type of the entity.
         */
        entityType: string;
    }

    /**
     * Interface for a (lookup) Tag value
     */
    interface TagValue extends LookupValue {
        /**
         * The originating lookup column that raised the event.
         */
        fieldName: string;
    }

    /**
     * Interface for an OptionSet value.
     */
    interface OptionSetValue {
        /**
         * The label text.
         */
        text: string;

        /**
         * The value, as a number
         */
        value: number;
    }

    /**
     * A collection of types and methods for working with formContext attributes.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/attributes External Link: Attributes (Client API reference)}
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
     */
    namespace Attributes {
        /**
         * Requirement Level for {@link Attributes.Attribute.getRequiredLevel Attributes.Attribute.getRequiredLevel()} and
         * {@link Attributes.Attribute.setRequiredLevel Attributes.Attribute.setRequiredLevel()}.
         * @see {@link XrmEnum.AttributeRequirementLevel}
         */
        type RequirementLevel = "none" | "recommended" | "required";

        /**
         * Date attribute formats for Attributes.Attribute.getFormat(), used by {@link Attributes.DateAttribute DateAttribute}.
         * @see {@link XrmEnum.DateAttributeFormat}
         */
        type DateAttributeFormat = "date" | "datetime";

        /**
         * Integer attribute formats for Attributes.Attribute.getFormat(), used by {@link Attributes.NumberAttribute NumberAttribute}.
         * @see {@link XrmEnum.IntegerAttributeFormat}
         */
        type IntegerAttributeFormat = "duration" | "none";

        /**
         * OptionSet attribute formats for Attributes.Attribute.getFormat(), used by {@link Attributes.OptionSetAttribute OptionSetAttribute}.
         * @see {@link XrmEnum.OptionSetAttributeFormat}
         */
        type OptionSetAttributeFormat = "language" | "timezone";

        /**
         * String attribute formats for Attributes.Attribute.getFormat(), used by {@link Attributes.StringAttribute StringAttribute}.
         * @see {@link XrmEnum.StringAttributeFormat}
         */
        type StringAttributeFormat = "email" | "phone" | "text" | "textarea" | "tickersymbol" | "url";

        /**
         * Attribute types used by {@link Xrm.Attributes.Attribute.getAttributeType getAttributeType()}.
         * @see {@link XrmEnum.AttributeType}
         */
        type AttributeType =
            | "boolean"
            | "datetime"
            | "decimal"
            | "double"
            | "integer"
            | "lookup"
            | "memo"
            | "money"
            | "multiselectoptionset"
            | "optionset"
            | "string";

        /**
         * Attribute formats for {@link Attributes.Attribute.getFormat Attributes.Attribute.getFormat()}.
         * @see {@link XrmEnum.DateAttributeFormat}
         * @see {@link XrmEnum.IntegerAttributeFormat}
         * @see {@link XrmEnum.OptionSetAttributeFormat}
         * @see {@link XrmEnum.StringAttributeFormat}
         */
        type AttributeFormat =
            | DateAttributeFormat
            | IntegerAttributeFormat
            | OptionSetAttributeFormat
            | StringAttributeFormat;

        /**
         * Possible attribute values that can be set or retrieved from an attribute.
         */
        type AttributeValues = string | number | number[] | boolean | Date | LookupValue[] | OptionSetValue;

        /**
         * Interface for an Entity attribute.
         */
        interface Attribute<T extends AttributeValues = AttributeValues> {
            /**
             * Adds a handler to be called when the attribute's value is changed.
             * @param handler The function reference.
             */
            addOnChange(handler: Events.Attribute.ChangeEventHandler): void;

            /**
             * Fire all "on change" event handlers.
             */
            fireOnChange(): void;

            /**
             * Gets attribute type.
             * @returns The attribute's type name.<BR><BR>
             * **Values returned are**:
             * * boolean
             * * datetime
             * * decimal
             * * double
             * * integer
             * * lookup
             * * memo
             * * money
             * * optionset
             * * string
             */
            getAttributeType(): AttributeType;

            /**
             * Gets the attribute format.
             * @returns The format of the attribute.<BR><BR>
             * **Values returned are**:
             * * date           (datetime)
             * * datetime       (datetime)
             * * duration       (integer)
             * * email          (string)
             * * language       (optionset)
             * * none           (integer)
             * * phone          (string)
             * * text           (string)
             * * textarea       (string)
             * * tickersymbol   (string)
             * * timezone       (optionset)
             * * url            (string)
             * @see {@link getAttributeType}
             */
            getFormat(): AttributeFormat;

            /**
             * Gets a boolean value indicating whether this Attribute has unsaved changes.
             * @returns true if there are unsaved changes, otherwise false.
             */
            getIsDirty(): boolean;

            /**
             * Gets the logical name of the attribute.
             * @returns The logical name.
             */
            getName(): string;

            /**
             * Gets a reference to the record context of this attribute.
             * @returns The parent record context.
             */
            getParent(): Entity;

            /**
             * Gets the current level of requirement for the attribute.
             * @returns The required level, as either "none", "required", or "recommended"
             */
            getRequiredLevel(): RequirementLevel;

            /**
             * Gets current submit mode for the attribute.
             * @returns The submit mode, as either "always", "never", or "dirty"
             * @remarks The default value is "dirty"
             */
            getSubmitMode(): SubmitMode;

            /**
             * Gets the current user's privileges for the attribute.
             * @returns The user privileges.
             */
            getUserPrivilege(): Privilege;

            /**
             * Removes the handler from the "on change" event.
             * @param handler The handler.
             */
            removeOnChange(handler: Events.Attribute.ChangeEventHandler): void;

            /**
             * Sets the required level.
             * @param requirementLevel The requirement level, as either "none", "required", or "recommended"
             * @see {@link XrmEnum.AttributeRequirementLevel}
             */
            setRequiredLevel(requirementLevel: RequirementLevel): void;

            /**
             * Sets the submit mode.
             * @param submitMode The submit mode, as either "always", "never", or "dirty".
             * @default submitMode "dirty"
             * @see {@link XrmEnum.AttributeRequirementLevel}
             */
            setSubmitMode(submitMode: SubmitMode): void;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.StandardControl>;

            /**
             * Gets the value.
             * @returns The value.
             */
            getValue(): T | null;

            /**
             * Sets the value.
             * @param value The value.
             * @remarks Attributes on Quick Create Forms will not save values set with this method.
             */
            setValue(value: T | null): void;

            /**
             * Sets a value for a column to determine whether it is valid or invalid with a message
             * @param isValid Specify false to set the column value to invalid and true to set the value to valid.
             * @param message The message to display.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/attributes/setisvalid External Link: setIsValid (Client API reference)}
             */
            setIsValid(isValid: boolean, message?: string): void;
        }

        /**
         * Interface for a Number attribute.
         * @see {@link Attribute}
         */
        interface NumberAttribute extends Attribute<number> {
            /**
             * Get the attribute type.
             * @returns The attribute type.
             */
            getAttributeType(): "integer" | "decimal" | "double" | "money";
            /**
             * Gets the attribute format.
             * @returns The format of the attribute.
             * Values returned are: duration, none
             */
            getFormat(): IntegerAttributeFormat;

            /**
             * Gets the maximum value allowed.
             * @returns The maximum value allowed.
             */
            getMax(): number;

            /**
             * Gets the minimum value allowed.
             * @returns The minimum value allowed.
             */
            getMin(): number;

            /**
             * Gets the attribute's configured precision.
             * @returns The total number of allowed decimal places.
             */
            getPrecision(): number;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.NumberControl>;

            /**
             * Sets the number of digits allowed to the right of the decimal point.
             * @param precision Number of digits allowed to the right of the decimal point.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/attributes/setprecision External Link: setPrecision (Client API reference)}
             */
            setPrecision(precision: number): void;
        }

        /**
         * Interface for a String attribute.
         * @see {@link Attribute}
         */
        interface StringAttribute extends Attribute<string> {
            /**
             * Get the attribute type.
             * @returns The attribute type.
             */
            getAttributeType(): "string";
            /**
             * Gets the attribute format.
             * @returns The format of the attribute.
             * Values returned are: email, phone, text, textarea, tickersymbol, url
             */
            getFormat(): StringAttributeFormat;

            /**
             * Gets maximum length allowed.
             * @returns The maximum length allowed.
             * @remarks The email form's "Description" attribute does not have the this method.
             */
            getMaxLength(): number;

            /**
             * Sets the value.
             * @param value The value.
             * @remarks A String field with the {@link Attribute.getFormat|email} format enforces email
             *          address formatting. Attributes on Quick Create Forms will not save values set
             *          with this method.
             */
            setValue(value: string | null): void;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.StringControl>;
        }

        /**
         * Common interface for enumeration attributes (MultiOptionSet, OptionSet and Boolean).
         * @see {@link Attribute}
         */
        interface EnumAttribute<T extends number[] | number | boolean> extends Attribute<T> {
            /**
             * Gets the initial value of the attribute.
             * @returns The initial value.
             * @remarks Valid for OptionSet and boolean attribute types
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/attributes/getinitialvalue External Link: getInitialValue (Client API reference)}
             */
            getInitialValue(): T | null;
        }

        /**
         * Interface for a Boolean attribute.
         * @see {@link EnumAttribute}
         */
        interface BooleanAttribute extends EnumAttribute<boolean> {
            /**
             * Gets the attribute format.
             * @returns the string "boolean"
             */
            getAttributeType(): "boolean";

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.BooleanControl>;
        }

        /**
         * Interface for a Date attribute.
         *
         * @see {@link Attribute}
         */
        interface DateAttribute extends Attribute<Date> {
            /**
             * Gets the attribute type.
             * @returns The attribute type.
             */
            getAttributeType(): "datetime";

            /**
             * Gets the attribute format.
             *
             * @returns The format of the attribute.
             * Values returned are: date, datetime
             */
            getFormat(): DateAttributeFormat;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.DateControl>;
        }

        /**
         * Interface an OptionSet attribute.
         * @see {@link EnumAttribute}
         */
        interface OptionSetAttribute<T extends number = number> extends EnumAttribute<T> {
            /**
             * Gets the attribute type.
             * @returns The attribute type.
             */
            getAttributeType(): "optionset";

            /**
             * Gets the attribute format.
             * @returns The format of the attribute.
             * Values returned are: language, timezone
             */
            getFormat(): OptionSetAttributeFormat;

            /**
             * Gets the option matching a value.
             * @param value The enumeration value of the option desired.
             * @returns The option.
             */
            getOption(value: number): OptionSetValue;

            /**
             * Gets the option matching a label.
             * @param label The label of the option desired.
             * @returns The option.
             */
            getOption(label: string): OptionSetValue;

            /**
             * Gets all of the options.
             * @returns An array of options.
             */
            getOptions(): OptionSetValue[];

            /**
             * Gets selected option.
             * @returns The selected option.
             */
            getSelectedOption(): OptionSetValue;

            /**
             * Gets the label of the currently selected option.
             * @returns The current value's label.
             */
            getText(): string;

            /**
             * Sets the value.
             * @param value The value.
             * @remarks     The getOptions() method returns option values as strings. You must use parseInt
             *              to convert them to numbers before you can use those values to set the value of an
             *              OptionSet attribute. Attributes on Quick Create Forms will not save values set
             *              with this method.
             */
            setValue(value: number | null): void;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.OptionSetControl>;
        }

        /**
         * Interface an OptionSet attribute.
         * @see {@link EnumAttribute}
         */
        interface MultiSelectOptionSetAttribute<T extends number = number> extends EnumAttribute<T[]> {
            /**
             * Gets the attribute type.
             * @returns The attribute type.
             */
            getAttributeType(): "multiselectoptionset";
            /**
             * Gets the attribute format.
             * @returns The format of the attribute.
             * Values returned are: language, timezone
             */
            getFormat(): OptionSetAttributeFormat;

            /**
             * Gets the option matching a value.
             * @param value The enumeration value of the option desired.
             * @returns The option.
             */
            getOption(value: number): OptionSetValue;

            /**
             * Gets the option matching a label.
             * @param label The label of the option desired.
             * @returns The option.
             */
            getOption(label: string): OptionSetValue;

            /**
             * Gets all of the options.
             * @returns An array of options.
             */
            getOptions(): OptionSetValue[];

            /**
             * Gets selected option.
             * @returns The selected option.
             */
            getSelectedOption(): OptionSetValue[];

            /**
             * Gets the label of the currently selected option.
             * @returns The current value's label.
             */
            getText(): string[];

            /**
             * Sets the value.
             * @param value The value.
             * @remarks     The getOptions() method returns option values as strings. You must use parseInt
             *              to convert them to numbers before you can use those values to set the value of an
             *              OptionSet attribute. Attributes on Quick Create Forms will not save values set
             *              with this method.
             */
            setValue(value: number[] | null): void;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.OptionSetControl>;
        }

        /**
         * Interface a Lookup attribute.
         *
         * @see {@link Attribute}
         */
        interface LookupAttribute extends Attribute<LookupValue[]> {
            /**
             * Gets the attribute type.
             */
            getAttributeType(): "lookup";

            /**
             * Gets a boolean value indicating whether the Lookup is a multi-value PartyList.
             * @returns true the attribute is a PartyList, otherwise false.
             */
            getIsPartyList(): boolean;

            /**
             * A collection of all the controls on the form that interface with this attribute.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Controls.LookupControl>;
        }
    }

    /**
     * A collection of types and methods for working with formContext controls.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
     */
    namespace Controls {
        /**
         * Control type for formContext.ui.quickForms.getControlType().
         */
        type ControlQuickFormType = "quickform";

        /**
         * Control types for {@link Controls.Control.getControlType Controls.Control.getControlType()}.
         * @see {@link XrmEnum.StandardControlType}
         */
        type ControlType =
            | "standard"
            | "iframe"
            | "lookup"
            | "optionset"
            | "subgrid"
            | "webresource"
            | "notes"
            | "timercontrol"
            | "kbsearch"
            | "timelinewall"
            | ControlQuickFormType;

        /**
         * Interface for UI elements with labels.
         */
        interface UiLabelElement {
            /**
             * Gets the label.
             * @returns The label.
             */
            getLabel(): string;

            /**
             * Sets the label.
             * @param label The label.
             */
            setLabel(label: string): void;
        }

        /**
         * Interface for UI elements which can have the disabled value read.
         */
        interface UiCanGetDisabledElement {
            /**
             * Gets a boolean value, indicating whether the control is disabled.
             * @returns true if it is disabled, otherwise false.
             */
            getDisabled(): boolean;
        }

        /**
         * Interface for UI elements which can have the disabled value updated.
         */
        interface UiCanSetDisabledElement {
            /**
             * Sets the state of the control to either enabled, or disabled.
             * @param disabled true to disable, false to enable.
             */
            setDisabled(disabled: boolean): void;
        }

        /**
         * Interface for UI elements which can have their available option values read.
         */
        interface UiCanGetOptionsElement {
            /**
             * Returns an array of option objects representing valid options available for a control,
             * including a blank option and excluding any options that have been removed from the control
             * using removeOption.
             *
             * @returns The array of option objects representing valid options where each option object has the following attributes:
             *          text: String. Label of the option.
             *          value: Number. Enumeration value of the option.
             */
            getOptions(): OptionSetValue[];
        }

        /**
         * Interface for UI elements which can have the visibility value read.
         */
        interface UiCanGetVisibleElement {
            /**
             * Gets the visibility state.
             * @returns true if the tab is visible, otherwise false.
             */
            getVisible(): boolean;
        }

        /**
         * Interface for UI elements which can have the visibility value updated.
         */
        interface UiCanSetVisibleElement {
            /**
             * Sets the visibility state.
             * @param visible true to show, false to hide.
             */
            setVisible(visible: boolean): void;
        }

        /**
         * Base interface for standard UI elements.
         */
        interface UiStandardElement extends UiCanGetVisibleElement, UiLabelElement {
            /**
             * Sets the visibility state.
             * @param visible true to show, false to hide.
             */
            setVisible(visible: boolean): void;
        }

        /**
         * Interface for focusable UI elements.
         */
        interface UiFocusable {
            /**
             * Sets focus on the element.
             */
            setFocus(): void;
        }

        /**
         * Interface for controls which methods provide immediate feedback or take actions as user types in a control.
         * Contains methods which can be used to perform data validations in a control even before the user commits (saves) the value in a form.
         */
        interface UiKeyPressable {
            /**
             * Use this to add a function as an event handler for the keypress event so that the function is called when you type a character in the specific text or number field.
             * For a sample JavaScript code that uses the addOnKeyPress method to configure the auto-completion experience, see Sample: Auto-complete in CRM controls.
             * @deprecated Deprecated in v9.1; Use a custom control.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
             * @param handler The function reference.
             */
            addOnKeyPress(handler: Events.ContextSensitiveHandler): void;

            /**
             * Use this to manually fire an event handler that you created for a specific text or number field to be executed on the keypress event.
             * @deprecated Deprecated in v9.1; Use a custom control.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
             */
            fireOnKeyPress(): void;

            /**
             * Use this to remove an event handler for a text or number field that you added using addOnKeyPress.
             * @deprecated Deprecated in v9.1; Use a custom control.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
             * Remarks:  If an anonymous function is set using addOnKeyPress, it can’t be removed using this method.
             * @param handler The function reference.
             */
            removeOnKeyPress(handler: Events.ContextSensitiveHandler): void;
        }

        /**
         * Interface for Result value of AutoCompleteResultSet
         */
        interface AutoCompleteResult {
            /**
             * The Identifier
             */
            id: string | number;

            /**
             * Url of the icon to display
             */
            icon?: string | undefined;

            /**
             * Display value(s) for this auto-complete option
             */
            fields: string[];
        }

        /**
         * Interface for command of AutoCompleteResultSet.  This is displayed at the bottom of the auto complete view
         */
        interface AutoCompleteCommand {
            /**
             * The Identifier
             */
            id: string;

            /**
             * Url of the icon to display
             */
            icon?: string | undefined;

            /**
             * Label to display at the bottom of the auto complete view
             */
            label: string;

            /**
             * Action to perform when user clicks on label
             */
            action(): void;
        }

        /**
         * Interface for showAutoComplete argument
         */
        interface AutoCompleteResultSet {
            /**
             * Results to show
             */
            results: AutoCompleteResult[];

            /**
             * Command to show/execute at the bottom of the results displayed
             */
            commands?: AutoCompleteCommand | undefined;
        }

        interface FieldControlOutput {
            /* Note: paramType and type properties are also on this object.
             * It's unclear if they're internal use only.
             *    paramType: undefined,
             *    type: number
             */

            /**
             * Output value from the control
             */
            value: any;
        }

        /**
         * Interface for controls.
         *
         * @see {@link UiLabelElement}
         * @see {@link UiCanGetVisibleElement}
         */
        interface Control extends UiLabelElement, UiCanGetVisibleElement {
            /**
             * Gets the controls type.
             * @returns The control type.<BR><BR>
             * **Values returned are**:
             * * standard
             * * iframe
             * * lookup
             * * optionset
             * * subgrid
             * * webresource
             * * notes
             * * timercontrol
             * * kbsearch
             * * quickform (see ui.QuickForm)
             * * customcontrol: <namespace>.<name> (A custom control for mobile phone and tablet clients).
             * * customsubgrid: <namespace>.<name> (A custom dataset control for mobile phone and tablet clients).
             */
            getControlType(): ControlType | `${string}.${string}`;

            /**
             * Gets the name of the control on the form.
             * @returns The name of the control.
             * @remarks     The name assigned to a control is not determined until the form loads. Changes to
             *              the form may change the name assigned to a given control.
             *              When you use the control getName method the name of the first control will be the
             *              same as the name of the attribute. The second instance of a control for that
             *              attribute will be "<attributeName>1". The pattern <attributeName>+N
             *              will continue for each additional control added to the form for a specific
             *              attribute. When a form displays a business process flow control in the header,
             *              additional controls will be added for each attribute that is displayed in the
             *              business process flow. These controls have a unique name like the following:
             *              header_process_<attribute name>.
             */
            getName(): string;

            /**
             * Gets a reference to the Section parent of the control.
             * @returns The parent Section.
             */
            getParent(): Section;
        }

        /**
         * Interface for {@link Ui.navigation formContext.ui.navigation}.
         */
        interface Navigation {
            /**
             * A reference to the collection of available navigation items.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            items: Collection.ItemCollection<NavigationItem>;
        }

        /**
         * Interface for a navigation item.
         * @see {@link UiStandardElement}
         * @see {@link UiFocusable}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-navigation External Link: formContext.ui.navigation item (Client API reference)}
         */
        interface NavigationItem extends UiStandardElement, UiFocusable {
            /**
             * Gets the name of the item.
             * @returns The identifier.
             */
            getId(): string;
        }

        /**
         * Interface for a standard control.
         * @see {@link Control}
         */
        interface StandardControl
            extends Control, UiStandardElement, UiFocusable, UiCanGetDisabledElement, UiCanSetDisabledElement
        {
            /**
             * Clears the notification identified by uniqueId.
             * @param uniqueId (Optional) Unique identifier.
             * @returns true if it succeeds, false if it fails.
             * @remarks If the uniqueId parameter is not used, the current notification shown will be removed.
             */
            clearNotification(uniqueId?: string): boolean;

            /**
             * Sets a control-local notification message.
             * @param message The message.
             * @param uniqueId Unique identifier.
             * @returns true if it succeeds, false if it fails.
             * @remarks     When this method is used on Microsoft Dynamics CRM for tablets a red "X" icon
             *              appears next to the control. Tapping on the icon will display the message.
             */
            setNotification(message: string, uniqueId: string): boolean;

            /**
             * Displays an error or recommendation notification for a control, and lets you specify actions to execute based on the notification.
             */
            addNotification(notification: AddControlNotificationOptions): void;

            /**
             * Adds an event handler to the OnOutputChange event.
             * @param handler The function to add to the OnOutputChange event.
             */
            addOnOutputChange(handler: Events.ContextSensitiveHandler): void;

            /**
             * Removes an event handler from the OnOutputChange event.
             * @param handler The function to remove from the OnOutputChange event.
             */
            removeOnOutputChange(handler: Events.ContextSensitiveHandler): void;

            /**
             * Returns a dictionary of the output properties of the control.
             * @returns A dictionary for the output parameters from the control.
             *    For a PCF control this is of the pattern <controlname>.fieldControl.<outputname>, e.g. telephone1.fieldControl.isValid
             */
            getOutputs(): { [index: string]: FieldControlOutput };

            /**
             * Gets the control's bound attribute.
             * @template T An Attribute type.
             * @returns The attribute.
             */
            getAttribute<T extends Attributes.Attribute>(): T;

            /**
             * Gets the control's bound attribute.
             * @returns The attribute.
             */
            getAttribute(): Attributes.Attribute;
        }

        /**
         * Interface for Auto Lookup Control.
         * This is not an Entity Lookup, but a control that supports AutoComplete / KeyPress Events (Text or Number)
         * @remarks This interface is not supported for CRM mobile clients (phones or tablets) and the interactive service hub.  It is only available for Updated entities.
         * @deprecated Deprecated in v9.
         * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
         * @see {@link StandardControl}
         */
        interface AutoLookupControl extends StandardControl, UiKeyPressable {
            /**
             * Gets the latest value in a control as the user types characters in a specific text or number field.
             * This method helps you to build interactive experiences by validating data and alerting users as they type characters in a control.
             * The getValue method is different from the attribute getValue method because the control method retrieves the value from the control
             * as the user is typing in the control as opposed to the attribute getValue method that retrieves the value after the user commits (saves) the field.
             */
            getValue(): string;

            /**
             * Hides the auto-completion drop-down list configured for a specific text field
             * @deprecated Deprecated in v9.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
             */
            hideAutoComplete(): void;

            /**
             * Shows upt to 10 matching strings in a drop-down list as users press keys to type charactrer in a specific text field.
             * On selecting an item in the drop-down list, the value in the text field changes to the selected item, the drop-down list disappears, and the OnChange event for the text field is invoked
             * @deprecated Deprecated in v9.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#some-client-apis-are-deprecated External Link: Deprecated Client APIs}
             * @param resultSet The results to show
             */
            showAutoComplete(resultSet: AutoCompleteResultSet): void;
        }

        /**
         * Interface for a Boolean (yes/no) control.
         * @see {@link StandardControl}
         */
        interface BooleanControl extends StandardControl {
            /**
             * Gets the control's bound attribute.
             * @returns The attribute.
             */
            getAttribute(): Attributes.BooleanAttribute;
        }

        /**
         * Interface for a String control.
         * @see {@link StandardControl}
         */
        interface StringControl extends StandardControl {
            /**
             * Gets the control's bound attribute.
             * @returns The attribute.
             */
            getAttribute(): Attributes.StringAttribute;
        }

        /**
         * Interface for a Number control.
         * @see {@link StandardControl}
         */
        interface NumberControl extends StandardControl {
            /**
             * Gets the control's bound attribute.
             * @returns The attribute.
             */
            getAttribute(): Attributes.NumberAttribute;
        }

        /**
         * Interface for a Date control.
         * @see {@link StandardControl}
         */
        interface DateControl extends StandardControl {
            /**
             * Gets the control's bound attribute.
             * @returns The attribute.
             */
            getAttribute(): Attributes.DateAttribute;

            /**
             * Gets the status of the time-of-day component of the Date control.
             * @returns true if the time is shown, otherwise false.
             */
            getShowTime(): boolean;

            /**
             * Sets the visibility of the time component of the Date control.
             * @param showTimeValue true to show, false to hide the time value.
             */
            setShowTime(showTimeValue: boolean): void;
        }

        /**
         * Interface for a Lookup control.
         * @see {@link StandardControl}
         */
        interface LookupControl extends StandardControl {
            /**
             * Adds a handler to the "pre search" event of the Lookup control.
             * @param handler The handler.
             */
            addPreSearch(handler: Events.ContextSensitiveHandler): void;

            /**
             * Adds an additional custom filter to the lookup, with the "AND" filter operator.
             * Can only be used within a "pre search" event handler
             * @see {@link addPreSearch}
             * @param filter Specifies the filter, as a serialized FetchXML "filter" node.
             * @param entityLogicalName (Optional) The logical name of the entity.
             * @remarks     If entityLogicalName is not specified, the filter will be applied to all entities
             *              valid for the Lookup control.
             * @example     Example filter: <filter type="and">
             *                              <condition attribute="address1_city" operator="eq" value="Redmond" />
             *                              </filter>
             */
            addCustomFilter(filter: string, entityLogicalName?: string): void;

            /**
             * Adds a custom view for the Lookup dialog.
             * @param viewId Unique identifier for the view, in Guid format.
             * @param entityName Name of the entity.
             * @param viewDisplayName Name of the view to display.
             * @param fetchXml The FetchXML query for the view's contents, serialized as a string.
             * @param layoutXml The Layout XML, serialized as a string.
             * @param isDefault true, to treat this view as default.
             * @remarks Cannot be used on "Owner" Lookup controls.
             *          The viewId is never saved to CRM, but must be unique across available views.  Generating
             *          a new value can be accomplished with a {@link http://www.guidgen.com/ External Link: Guid generator}.
             * @example Example viewId value: "{00000000-0000-0000-0000-000000000001}"
             * @see {@link https://learn.microsoft.com/en-us/previous-versions/dynamicscrm-2016/developers-guide/gg334522(v=crm.8) External Link: Layout XML Reference}
             */
            addCustomView(
                viewId: string,
                entityName: string,
                viewDisplayName: string,
                fetchXml: string,
                layoutXml: string,
                isDefault: boolean,
            ): void;

            /**
             * Adds an event handler to the "lookup tag click" event.
             * @param handler The function to add to the OnLookupTagClick event.
             */
            addOnLookupTagClick(handler: Events.LookupTagClickHandler): void;

            /**
             * Gets the control's bound attribute.
             * @returns The attribute.
             */
            getAttribute(): Attributes.LookupAttribute;

            /**
             * Gets the unique identifier of the default view.
             * @returns The default view, in Guid format.
             * @example Example return: "{00000000-0000-0000-0000-000000000000}"
             */
            getDefaultView(): string;

            /**
             * Removes the handler from the "lookup tag click" event.
             * @param handler The function to be removed from the OnLookupTagClick event.
             */
            removeOnLookupTagClick(handler: Events.LookupTagClickHandler): void;

            /**
             * Removes the handler from the "pre search" event of the Lookup control.
             * @param handler The handler.
             */
            removePreSearch(handler: Events.ContextSensitiveHandler): void;

            /**
             * Sets the Lookup's default view.
             * @param viewGuid Unique identifier for the view.
             * @example Example viewGuid value: "{00000000-0000-0000-0000-000000000000}"
             */
            setDefaultView(viewGuid: string): void;

            /**
             * Gets the types of entities allowed in the lookup control.
             */
            getEntityTypes(): string[];

            /**
             * Sets the types of entities allowed in the lookup control.
             */
            setEntityTypes(entityLogicalNames: string[]): void;
        }

        /**
         * Interface for an OptionSet control.
         *
         * @see {@link StandardControl}
         */
        interface OptionSetControl extends StandardControl, UiCanGetOptionsElement {
            /**
             * Adds an option.
             *
             * @param option The option.
             * @param index (Optional) zero-based index of the option.
             *
             * @remarks This method does not check that the values within the options you add are valid.
             *          If index is not provided, the new option will be added to the end of the list.
             */
            addOption(option: OptionSetValue, index?: number): void;

            /**
             * Clears all options.
             */
            clearOptions(): void;

            /**
             * Gets the control's bound attribute.
             *
             * @returns The attribute.
             */
            getAttribute(): Attributes.OptionSetAttribute;

            /**
             * Removes the option matching the value.
             *
             * @param value The value.
             */
            removeOption(value: number): void;
        }

        interface MultiSelectOptionSetControl extends StandardControl, UiCanGetOptionsElement {
            /**
             * Adds an option.
             *
             * @param option The option.
             * @param index (Optional) zero-based index of the option.
             *
             * @remarks This method does not check that the values within the options you add are valid.
             *          If index is not provided, the new option will be added to the end of the list.
             */
            addOption(option: OptionSetValue, index?: number): void;

            /**
             * Clears all options.
             */
            clearOptions(): void;

            /**
             * Gets the control's bound attribute.
             *
             * @returns The attribute.
             */
            getAttribute(): Attributes.MultiSelectOptionSetAttribute;

            /**
             * Removes the option matching the value.
             *
             * @param value The value.
             */
            removeOption(value: number): void;
        }

        /**
         * Interface for a CRM grid control.
         *
         * @see {@link Control}
         */
        interface GridControl extends Control, UiCanSetVisibleElement {
            /**
             * Use this method to add event handlers to the GridControl's OnLoad event.
             * @param handler The event handler.
             */
            addOnLoad(handler: Events.GridControl.LoadEventHandler): void;

            /**
             * This method returns context information about the GridControl.
             * @returns The context type.
             */
            getContextType(): XrmEnum.GridControlContext;

            /**
             * Gets the logical name of the table data displayed in the grid.
             * @returns The logical name of the table data displayed in the grid.
             */
            getEntityName(): string;

            /**
             * Gets the FetchXML query that represents the current data, including filtered and sorted data, in the grid control.
             * @returns The FetchXML query.
             */
            getFetchXml(): string;

            /**
             * Get access to the Grid available in the GridControl (gridContext).
             * @returns The Grid object.
             */
            getGrid(): Grid;

            /**
             * Gets information about the relationship used to filter the subgrid.
             * @returns A relationship object.
             */
            getRelationship(): GridRelationship;

            /**
             * Gets the URL of the current grid control.
             * @param client Indicates the client type.
             * @returns Gets the URL of the current grid control.
             */
            getUrl(client?: XrmEnum.GridClient): string;

            /**
             * Use this method to get access to the ViewSelector available for the GridControl when it is configured to display views.
             * @returns The view selector.
             */
            getViewSelector(): ViewSelector;

            /**
             * Displays the associated grid for the grid.
             * @remarks This method does nothing if the grid is not filtered based on a relationship.
             */
            openRelatedGrid(): void;

            /**
             * Refreshes the sub grid.
             * @remarks Not available during the "on load" event of the form.
             */
            refresh(): void;

            /**
             * Refreshes the sub grid ribbon.
             * @see {@link https://learn.microsoft.com/it-it/power-apps/developer/model-driven-apps/clientapi/reference/grids/gridcontrol/refreshribbon External Link: refreshRibbon (Client API reference)}
             */
            refreshRibbon(): void;

            /**
             * Use this method to remove event handlers from the GridControl's OnLoad event.
             * @param handler The handler.
             */
            removeOnLoad(handler: () => void): void;
        }

        /**
         * Interface for a grid.  Use Grid methods to access information about data in the grid. Grid is returned by the
         * GridControl.getGrid method.
         */
        interface Grid {
            /**
             * Returns a collection of every GridRow in the Grid.
             * @returns The rows.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            getRows(): Collection.ItemCollection<Grid.GridRow>;

            /**
             * Returns a collection of every selected GridRow in the Grid.
             * @returns The selected rows.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            getSelectedRows(): Collection.ItemCollection<Grid.GridRow>;

            /**
             * Returns the total number of records in the Grid.
             * @returns The total record count.
             */
            getTotalRecordCount(): number;
        }

        /**
         * Object containing information about the relationship used to filter the subgrid.
         */
        interface GridRelationship {
            /**
             * Name of the column
             */
            attributeName: string;

            /**
             * Name of the relationship
             */
            name: string;

            /**
             * Name of the navigation property for this relationship.
             */
            navigationPropertyName: string;

            /**
             * Returns one of the following values to indicate the relationship type.
             */
            relationshipType: XrmEnum.RelationshipType;

            /**
             * Returns one of the following values to indicate the role type of relationship
             */
            roleType: XrmEnum.RoleType;
        }

        namespace Grid {
            /**
             * Interface for a grid row.  Use the GridRow.getData method to access the GridRowData. A collection of GridRow is
             * returned by Grid.getRows and Grid.getSelectedRows methods.
             * In V9 - this is essentailly a form context
             */
            interface GridRow {
                /**
                 * Provides methods to work with the row data.
                 */
                data: Data;
                /**
                 * Returns the GridRowData for the GridRow.
                 * @deprecated Deprecated in V9 - use data field instead
                 * @returns The data.
                 */
                getData(): GridRowData;
            }

            /**
             * Interface for grid row data.  Use the GridRowData.getEntity method to access the GridEntity. GridRowData is
             * returned by the GridRow.getData method.
             */
            interface GridRowData {
                /**
                 * Returns the GridEntity for the GridRowData.
                 * @returns The entity.
                 * @deprecated Use GridRow.data.entity instead of using GridRow.getData().getEntity().
                 */
                getEntity(): GridEntity;
            }

            /**
             * Interface for a grid entity.  Use the GridEntity methods to access data about the specific records in the rows.
             * GridEntity is returned by the GridRowData.getEntity method.
             *
             * @deprecated Use GridRow.data.entity instead.
             */
            interface GridEntity {
                /**
                 * Returns the logical name for the record in the row.
                 *
                 * @returns The entity name.
                 * @deprecated Use GridRow.data.entity.getEntityName() instead.
                 */
                getEntityName(): string;

                /**
                 * Returns a LookupValue that references this record.
                 *
                 * @returns The entity reference.
                 * @deprecated Use GridRow.data.entity.getEntityReference() instead.
                 */
                getEntityReference(): LookupValue;

                /**
                 * Returns the id for the record in the row.
                 *
                 * @returns The identifier of the GridEntity, in GUID format.
                 * @example Example return: "{00000000-0000-0000-0000-000000000000}"
                 * @deprecated Use GridRow.data.entity.getId() instead.
                 */
                getId(): string;

                /**
                 * Returns the primary attribute value for the record in the row.  (Commonly the name.)
                 *
                 * @returns The primary attribute value.
                 * @deprecated Use GridRow.data.entity.getPrimaryAttributeValue() instead.
                 */
                getPrimaryAttributeValue(): string;
            }
        }

        /**
         * Interface for a framed control, which is either a Web Resource or an Iframe.
         * @see {@link Control}
         * @remarks     An Iframe control provides additional methods, so use {@link IframeControl} where
         *              appropriate.  Silverlight controls should use {@link SilverlightControl}.
         */
        interface FramedControl extends Control {
            /**
             * Returns the content window that represents an IFRAME or web resource.
             * @returns A promise that contains a content window instance representing an IFRAME or web resource.
             * @remarks This method is supported only on Unified Interface.  The implementer is expected to call
             * a custom function within the returned window that will receive the Xrm and formContext objects as
             * parameters.
             */
            getContentWindow(): Promise<Window>;

            /**
             * Gets the DOM element containing the control.
             * @returns The container object.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            getObject(): HTMLIFrameElement;

            /**
             * Gets the URL value of the control.
             * @returns The source URL.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            getSrc(): string;

            /**
             * Sets the URL value of the control.
             * @param src The source URL.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            setSrc(src: string): void;
        }

        /**
         * Interface for an Iframe control.
         * @see {@link FramedControl}
         */
        interface IframeControl extends FramedControl, UiCanSetVisibleElement {
            /**
             * Gets initial URL defined for the Iframe.
             * @returns The initial URL.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            getInitialUrl(): string;
        }

        /**
         * Interface for a knowledge base search control
         */
        interface KbSearchControl extends Control {
            /**
             * Adds an event handler to the PostSearch event.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/addonpostsearch External Link: addOnPostSearch (Client API reference)}
             */
            addOnPostSearch(handler: Events.KbSearchControl.PostSearchEventHandler): void;

            /**
             * Adds an event handler to the OnResultOpened event.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/addonresultopened External Link: addOnResultOpened (Client API reference)}
             */
            addOnResultOpened(handler: Events.KbSearchControl.ResultOpenedEventHandler): void;

            /**
             * Adds an event handler to the OnSelection event.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/addonselection External Link: addOnSelection (Client API reference)}
             */
            addOnSelection(handler: Events.KbSearchControl.SelectionEventHandler): void;

            /**
             * Gets the text used as the search criteria for the knowledge base management control.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/getsearchquery External Link: getSearchQuery (Client API reference)}
             */
            getSearchQuery(): string;

            /**
             * Gets the currently selected result of the search control. The currently selected result also represents the result that is currently open.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/getselectedresults External Link: getSelectedResults (Client API Reference)}
             */
            getSelectedResults(): KbSearchResult;

            /**
             * Gets the count of results found in the search control.
             * @returns The count of the search result.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/gettotalresultcount External Link: getTotalResultCount (Client API reference)}
             */
            getTotalResultCount(): number;

            /**
             * Opens a search result in the search control by specifying the result number.
             * @param resultNumber Numerical value specifying the result number to be opened. Result number starts from 1.
             * @param mode Specify "Inline" or "Popout". "Inline" mode opens the result inline either in the reading pane of the control or in a reference panel tab in case of reference panel. "Popout" mode opens the result in a pop-out window.
             * @returns Status of opening the specified search result. Returns 1 if successful; 0 if unsuccessful. The method will return -1 if the specified resultNumber value is not present, or if the specified mode value is invalid.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/opensearchresult External Link: openSearchResult (Client API reference)}
             */
            openSearchResult(resultNumber: number, mode?: XrmEnum.OpenSearchResultMode): boolean;

            /**
             * Removes an event handler from the PostSearch event.
             * @param handler The function to remove from the PostSearch event.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/removeonpostsearch External Link: removeOnPostSearch (Client API reference)}
             */
            removeOnPostSearch(handler: Events.KbSearchControl.PostSearchEventHandler): void;

            /**
             * Removes an event handler from the OnResultOpened event.
             * @param handler The function to remove from the OnResultOpened event.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/removeonresultopened External Link: removeOnResultOpened (Client API reference)}
             */
            removeOnResultOpened(handler: Events.KbSearchControl.ResultOpenedEventHandler): void;

            /**
             * Removes an event handler from the OnResultSelection event.
             * @param handler The function to remove from the OnSelection event.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/removeonselection External Link: removeOnSelection (Client API reference)}
             */
            removeOnSelection(handler: Events.KbSearchControl.SelectionEventHandler): void;

            /**
             * Sets the text used as the search criteria for the knowledge base search control.
             * @param searchString The text for the search query.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/setsearchquery External Link: setSearchQuery (Client API reference)}
             */
            setSearchQuery(searchString: string): void;
        }

        /**
         * Interface for a knowledge base search result.
         */
        interface KbSearchResult {
            /**
             * The HTML markup containing the content of the article.
             */
            answer: string;

            /**
             * The article ID that is used as an alternate key.
             * @remarks You can use this to see if this article already exists in Microsoft Dataverse.
             */
            articleId: string;

            /**
             * The unique article ID. This value is used as an alternate key.
             */
            articleUid: string;

            /**
             * Number of attachments in the article.
             */
            attachmentCount: number;

            /**
             * The date the article was created in the user's current time zone and format.
             */
            createdOn: Date;

            /**
             * The date the article was or will be expired.
             */
            expiredDate: Date;

            /**
             * The link to the folder path of the article.
             */
            folderHref: string;

            /**
             * The direct link to the article.
             */
            href: string;

            /**
             * Indicates whether the article is associated with the parent record.
             */
            isAssociated: boolean;

            /**
             * Date on which the article was last modified in the current user's timezone and format.
             */
            lastModifiedOn: Date;

            /**
             * Support Portal URL of the article.
             * @remarks If the Portal URL option is turned off, this will be blank.
             */
            publicUrl: string;

            /**
             * Whether the Article is in published or draft state.
             */
            published: boolean;

            /**
             * The title of the article.
             */
            question: string;

            /**
             * The rating of the article.
             */
            rating: number;

            /**
             * A short snippet of article content which contains the areas where the search query was hit.
             */
            searchBlurb: string;

            /**
             * Link to the article. Use this link to open the article.
             */
            serviceDeskUri: string;

            /**
             * The number of times an article is viewed on the portal by customers.
             */
            timesViewed: number;
        }

        /**
         * Interface for a quick view control instance on a form.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-quickforms External Link: formContext.ui.quickForms (Client API reference)}
         */
        interface QuickFormControl
            extends
                Control,
                UiLabelElement,
                UiFocusable,
                UiCanGetDisabledElement,
                UiCanSetDisabledElement,
                UiCanGetVisibleElement,
                UiCanSetVisibleElement
        {
            /**
             * Gets the constituent control in a quick view control by name or index.
             * @param T A Control type
             * @param controlNameOrIndex Name or index of the control.
             * @returns The control.
             * @remarks Constituent controls in a quick view control are read only.
             */
            getControl<T extends Control>(controlNameOrIndex: string | number): T | null;

            /**
             * Gets the constituent control in a quick view control by name or index.
             * @param controlNameOrIndex Name or index of the control.
             * @returns The control.
             * @remarks Constituent controls in a quick view control are read only.
             */
            getControl(controlNameOrIndex: string | number): Control | null;

            /**
             * Gets the constituent controls in a quick view control.
             * @returns An array of controls.
             * @remarks Constituent controls in a quick view control are read only.
             */
            getControl(): Control[] | null;

            /**
             * Gets the controls type.
             * @returns Returns a string value ("quickform") that categorizes quick view controls.
             */
            getControlType(): ControlQuickFormType;

            /**
             * Gets a reference to the Section parent of the control.
             * @returns The parent Section.
             */
            getParent(): Section;

            /**
             * Returns whether the data binding for the constituent controls in a quick view control is complete.
             * @returns  True is the data binding for a constituent control is complete, otherwise false.
             *          because the quick view form that the control is bound to may not have loaded completely.
             *          As a result, using the getAttribute or any data-related methods on a constituent control might not work.
             *          The isLoaded method for the quick view control helps determine the data binding status for constituent controls in a quick view control.
             * @remarks The data binding for the constituent controls in a quick view control may not be complete during the main form OnLoad event
             */
            isLoaded(): boolean;

            /**
             * Refreshes the data displayed in a quick view control.
             */
            refresh(): void;
        }

        /**
         * Interface for a Silverlight control.
         * @see {@link Control}
         * @deprecated The Silverlight WebResource is deprecated on the web client, and is not supported on the new Unified Interface in v9.
         * Instead of silverlight, use custom controls created using the HTML web resources with HTML5 to create UI components to visualize and interact with data.
         */
        interface SilverlightControl extends Control {
            /**
             * Gets the query string value passed to Silverlight.
             * @returns The data.
             * @deprecated Silverlight is no longer supported. These methods won't be available after October 2020.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            getData(): string;

            /**
             * Sets the query string value passed to Silverlight.
             * @param data The data.
             * @deprecated Silverlight is no longer supported. These methods won't be available after October 2020.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            setData(data: string): void;

            /**
             * Gets the DOM element containing the control.
             * @returns The container object.
             * @remarks Unavailable for Microsoft Dynamics CRM for tablets.
             */
            getObject(): HTMLObjectElement;
        }

        /**
         * Interface for a Timeline control.
         * @see {@link Xrm.Controls.Control}
         */
        interface TimelineWall extends Control {
            /**
             * Refreshes the data displayed in a timelinewall and timer control.
             */
            refresh(): void;
        }

        /**
         * Interface for a form tab.
         * @see {@link UiStandardElement}
         * @see {@link UiFocusable}
         */
        interface Tab extends UiStandardElement, UiFocusable {
            /**
             * Adds a function to be called when the TabStateChange event occurs.
             * @param handler The function to be executed on the TabStateChange event.
             */
            addTabStateChange(handler: Events.ContextSensitiveHandler): void;

            /**
             * Gets display state of the tab.
             * @returns The display state, as either "expanded" or "collapsed"
             */
            getDisplayState(): DisplayState;

            /**
             * Gets the name of the tab.
             * @returns The name.
             */
            getName(): string;

            /**
             * Gets a reference to the {@link FormContext.ui formContext.ui} parent of the tab.
             * @returns The parent.
             */
            getParent(): Ui;

            /**
             * Removes a function to be called when the TabStateChange event occurs.
             * @param handler The function to be removed from the TabStateChange event.
             */
            removeTabStateChange(handler: Events.ContextSensitiveHandler): void;

            /**
             * Sets display state of the tab.
             * @param displayState Display state of the tab, as either "expanded" or "collapsed"
             * @deprecated Deprecated in the 2021 release wave 1 (April 2021). Use the setFocus method in Unified Interface to ensure the correct tab is opened on a form.
             */
            setDisplayState(displayState: DisplayState): void;

            /**
             * A reference to the collection of form sections within this tab.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            sections: Collection.ItemCollection<Section>;
        }

        /**
         * Interface for a form section.
         * @see {@link UiStandardElement}
         */
        interface Section extends UiStandardElement {
            /**
             * Gets the name of the section.
             * @returns The name.
             */
            getName(): string;

            /**
             * Gets a reference to the parent {@link Tab}.
             * @returns The parent.
             */
            getParent(): Tab;

            /**
             * A reference to the collection of controls within this tab.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            controls: Collection.ItemCollection<Control>;
        }

        interface FooterSection {
            /**
             * Returns the footer section visibility.
             * @remarks Available only for Unified Interface.  Footers aren't supported after 2021 wave 2 release.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#form-footers-in-model-driven-apps-wont-be-supported-with-the-2021-release-wave-2 External Link: Important notices}
             */
            getVisible(): boolean;

            /**
             * Sets the visibility of the footer section.
             * @param bool Specify true to show the footer section; false to hide the footer section.
             * @remarks Available only for Unified Interface.  Footers aren't supported after 2021 wave 2 release.
             * @see {@link https://learn.microsoft.com/en-us/power-platform/important-changes-coming#form-footers-in-model-driven-apps-wont-be-supported-with-the-2021-release-wave-2 External Link: Important notices}
             */
            setVisible(bool: boolean): void;
        }

        interface HeaderSection {
            /**
             * Returns the header's body visibility.
             * @remarks Available only for Unified Interface.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-headersection/getbodyvisible External Link: getBodyVisible (Client API reference)}
             */
            getBodyVisible(): boolean;

            /**
             * Returns the command bar visibility.
             * @remarks Available only for Unified Interface.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-headersection/getcommandbarvisible External Link: getCommandBarVisible (Client API reference)}
             */
            getCommandBarVisible(): boolean;

            /**
             * Returns the tab navigator visibility.
             * @remarks Available only for Unified Interface.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-headersection/gettabnavigatorvisible External Link: getTabNavigatorVisible (Client API reference)}
             */
            getTabNavigatorVisible(): boolean;

            /**
             * Sets the header's body visibility.
             * @param bool Specify true to show the body; false to hide the body.
             * @remarks Available only for Unified Interface.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-headersection/setbodyvisible External Link: setBodyVisible (Client API reference)}
             */
            setBodyVisible(bool: boolean): void;

            /**
             * Sets the command bar visibility.
             * @param bool Specify true to show the command bar; false to hide the command bar.
             * @remarks Available only for Unified Interface.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-headersection/setcommandbarvisible External Link: setCommandBarVisible (Client API reference)}
             */
            setCommandBarVisible(bool: boolean): void;

            /**
             * Sets the tab navigator visibility.
             * @param bool Specify true to show the tab navigator; false to hide the tab navigator.
             * @remarks Available only for Unified Interface.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-headersection/settabnavigatorvisible External Link: setTabNavigatorVisible (Client API reference)}
             */
            setTabNavigatorVisible(bool: boolean): void;
        }

        interface AddControlNotificationOptions {
            /**
             * A collection of actions
             */
            actions?: ControlNotificationAction[] | undefined;

            /**
             * The message to display in the notification.
             * In the current release, only the first message specified in this array will be displayed.
             */
            messages: string[];

            /**
             * Defines the type of notification.
             */
            notificationLevel?: NotificationLevel | undefined;

            /**
             * The ID to use to clear this notification when using the clearNotification method.
             */
            uniqueId: string;
        }

        /**
         * Constants to use with the addNotification method of form controls
         */
        type NotificationLevel = "ERROR" | "RECOMMENDATION";

        /**
         * interface to define the actions on a control notification
         */
        interface ControlNotificationAction {
            /**
             * The body message of the notification to be displayed to the user. Limit your message to 100 characters for optimal user experience.
             */
            message?: string | undefined;

            /**
             * Array of functions. The corresponding actions for the message.
             */
            actions: Array<() => void>;
        }

        interface ProcessControl extends UiCanGetVisibleElement, UiCanSetVisibleElement {
            /**
             * Sets display state of the process flow control.
             * @param displayState Display state of the process flow control, as either "expanded" or "collapsed"
             */
            setDisplayState(displayState: DisplayState): void;

            /**
             * Gets the display state of the process flow control.
             */
            getDisplayState(): DisplayState;

            /**
             * Reflow the UI of the process control
             * @param updateUI Specify true to update the UI of the process control; false otherwise.
             * @param parentStage ID of the parent stage.
             * @param nextStage ID of the next stage.
             */
            reflow(updateUI: boolean, parentStage: string, nextStage: string): void;
        }

        /**
         * Interface for an entity's form selector item.
         */
        interface FormItem {
            /**
             * Gets the unique identifier of the form.
             * @returns The identifier, in Guid format.
             */
            getId(): string;

            /**
             * Gets the label for the form.
             * @returns The label.
             */
            getLabel(): string;

            /**
             * Returns a value that indicates whether the form is currently visible.
             * @returns true if the form is visible; false otherwise.
             */
            getVisible(): boolean;

            /**
             * Navigates the user to this form.
             */
            navigate(): void;

            /**
             * Sets a value that indicates whether the form is visible.
             * @param isVisible Specify true to show the form; false to hide the form.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-formselector/setvisible External Link: setVisible (Client API reference)}
             */
            setVisible(isVisible: boolean): void;
        }

        /**
         * Interface for the form selector API.
         */
        interface FormSelector {
            /**
             * Gets current form.
             * @returns The current item.
             * @remarks When only one form is available this method will return null.
             */
            getCurrentItem(): FormItem;

            /**
             * A reference to the collection of available forms.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            items: Collection.ItemCollection<FormItem>;
        }

        /**
         * Interface for the view selector.  Use the ViewSelector methods to get or set information about the view selector
         * of the grid control.
         */
        interface ViewSelector {
            /**
             * Use this method to get a reference to the current view.
             * @returns The current view.
             */
            getCurrentView(): LookupValue;

            /**
             * Use this method to determine whether the view selector is visible.
             * @returns true if visible, false if not.
             */
            isVisible(): boolean;

            /**
             * Use this method to set the current view.
             * @param viewSelectorItem The view selector item.
             */
            setCurrentView(viewSelectorItem: LookupValue): void;
        }

        /**
         * Interface for a view selector item. This object contains data that identifies a view. Use this as a parameter to
         * the ViewSelector.setCurrentView method.
         */
        interface ViewSelectorItem {
            /**
             * Returns a LookupValue that references this view.
             * @returns The entity reference.
             */
            getEntityReference(): LookupValue;
        }
    }

    /**
     * Interface for the form's record context, {@link Data.entity formContext.data.entity}
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data-entity External Link: formContext.data.entity (Client API reference)}
     */
    interface Entity {
        /**
         * Adds a function to be called after the OnSave is complete.
         * @param handler The handler.
         * @remarks Added in 9.2
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/postsave External Link: PostSave Event Documentation}
         */
        addOnPostSave(handler: Events.PostSaveEventHandler): void;

        /**
         * Adds a handler to be called when the record is saved.
         * @param handler The handler.
         */
        addOnSave(handler: Events.SaveEventHandler | Events.SaveEventHandlerAsync): void;

        /**
         * Gets an serialized-XML string representing data that will be passed to the server upon saving the record.
         * @returns The XML in string format.
         * @remarks This function does not work with Microsoft Dynamics CRM for tablets.
         * @example "<account><name>Contoso</name><accountnumber>55555</accountnumber><telephone2>425
         *          555-1234</telephone2></account>".
         */
        getDataXml(): string;

        /**
         * Gets entity's logical name.
         * @returns  The logical name.
         */
        getEntityName(): string;

        /**
         * Gets a lookup value that references the record.
         * @returns A lookup value that references the record.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data-entity/getentityreference External Link: getEntityReference API Documentation}
         */
        getEntityReference(): LookupValue;

        /**
         * Gets the record's unique identifier.
         * @returns The identifier, in Guid format.
         * @example Example: "{825CB223-A651-DF11-AA8B-00155DBA3804}".
         */
        getId(): string;

        /**
         * Gets a boolean value indicating whether the record has unsaved changes.
         * @returns true if there are unsaved changes, otherwise false.
         */
        getIsDirty(): boolean;

        /**
         * Gets the record's primary attribute value.
         * @returns The primary attribute value.
         * @remarks The value for this attribute is used when links to the record are displayed.
         */
        getPrimaryAttributeValue(): string;

        /**
         * Gets a boolean value indicating whether all of the entity data is valid.
         * @returns true if all of the entity data is valid; false otherwise.
         */
        isValid(): boolean;

        /**
         * @see {@link https://learn.microsoft.com/power-apps/developer/model-driven-apps/clientapi/reference/controls/removeonpostsave External Link: removeOnPostSave (Client API reference)}
         */
        removeOnPostSave(handler: Events.PostSaveEventHandler): void;

        /**
         * Removes the handler from the "on save" event.
         * @param handler The handler.
         */
        removeOnSave(handler: Events.SaveEventHandler | Events.SaveEventHandlerAsync): void;

        /**
         * Saves the record synchronously with the options to close the form or open a new form after the save is completed.
         * @remarks  When using quick create forms in the web application the saveandnew option is not
         *           applied. It will always work as if saveandclose were used. Quick create forms in
         *           Microsoft Dynamics CRM for tablets will apply the saveandnew behavior.
         * @deprecated Deprecated in v9.1; This method is deprecated and we recommend to use the {@link Xrm.Data.save formContext.data.save()} method.
         */
        save(): void;

        /**
         * Saves the record with the given save mode.
         * @param saveMode (Optional) the save mode to save, as either "saveandclose" or "saveandnew".  If no parameter is included in the method, the record will simply be saved.
         */
        save(saveMode?: EntitySaveMode): void;

        /**
         * The collection of attributes for the record.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/attributes External Link: Attributes (Client API reference)}
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
         */
        attributes: Collection.ItemCollection<Attributes.Attribute>;
    }

    namespace ProcessFlow {
        /**
         * Direction types for a process stage change event
         * @see {@link XrmEnum.StageChangeDirection}
         */
        type StageChangeDirection = "Next" | "Previous";

        /**
         * Status for {@link ProcessFlow.Stage.getStatus Stage.getStatus()}.
         * @see {@link XrmEnum.StageStatus}
         */
        type StageStatus = "active" | "inactive";

        /**
         * Status for {@link ProcessFlow.Process.getStatus Process.getStatus()}.
         * @see {@link XrmEnum.ProcessStatus}
         */
        type ProcessStatus = "active" | "aborted" | "finished";

        /**
         * Interface for a CRM Business Process Flow instance.
         */
        interface Process {
            /**
             * Returns the unique identifier of the process.
             * @returns The identifier for this process, in GUID format.
             * @example Example: "{825CB223-A651-DF11-AA8B-00155DBA3804}".
             */
            getId(): string;

            /**
             * Returns the name of the process.
             * @returns The name.
             */
            getName(): string;

            /**
             * Returns the status of the process.
             * @returns The status, either as "active", "aborted" or "finished".
             */
            getStatus(): ProcessStatus;

            /**
             * Returns an collection of stages in the process.
             * @returns The stages.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            getStages(): Collection.ItemCollection<Stage>;

            /**
             * Returns a boolean value to indicate if the process is rendered.
             * @returns true if the process is rendered, false if not.
             */
            isRendered(): boolean;
        }

        /**
         * Interface for CRM Business Process Flow stages.
         */
        interface Stage {
            /**
             * Returns an object with a getValue method which will return the integer value of the business process flow
             * category.
             * @returns The stage category.
             */
            getCategory(): { getValue(): XrmEnum.StageCategory };

            /**
             * Returns the logical name of the entity associated with the stage.
             * @returns The entity name.
             */
            getEntityName(): string;

            /**
             * Returns the unique identifier of the stage.
             * @returns The identifier of the Stage, in GUID format.
             * @example Example: "{825CB223-A651-DF11-AA8B-00155DBA3804}".
             */
            getId(): string;

            /**
             * Returns the name of the stage.
             * @returns The name.
             */
            getName(): string;

            /**
             * Returns the status of the stage.
             * @returns The status, either "active" or "inactive".
             */
            getStatus(): StageStatus;

            /**
             * Returns a collection of steps in the stage.
             * @returns An array of Step.
             */
            getSteps(): Step[];
        }

        interface Step {
            /**
             * Returns the logical name of the attribute associated to the step.
             * @returns The attribute.
             * @remarks Some steps don’t contain an attribute value.
             */
            getAttribute(): string;

            /**
             * Returns the name of the step.
             * @returns The name.
             */
            getName(): string;

            /**
             * Returns whether the step is required in the business process flow.
             * @returns true if required, false if not.
             * @remarks     Returns true if the step is marked as required in the Business Process Flow editor; otherwise, false.
             *              There is no connection between this value and the values you can change in the formContext.data.entity
             *              attribute RequiredLevel methods.
             */
            isRequired(): boolean;
        }

        /**
         * Interface for the formContext.data.process API.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data-process External Link: formContext.data.process (Client API reference)}
         */
        interface ProcessManager {
            /**
             * Returns a Process object representing the active process.
             * @returns current active process.
             */
            getActiveProcess(): Process;

            /**
             * Set a Process as the active process.
             * @param processId The Id of the process to make the active process.
             * @param callbackFunction (Optional) a function to call when the operation is complete.
             */
            setActiveProcess(processId: string, callbackFunction?: ProcessCallbackDelegate): void;

            /**
             * Returns all process instances for the entity record that the calling user has access to.
             * @param callbackFunction (Optional) a function to call when the operation is complete.
             */
            getProcessInstances(callbackFunction?: GetProcessInstancesDelegate): void;

            /**
             * Sets a process instance as the active instance
             * @param processInstanceId The Id of the process instance to make the active instance.
             * @param callbackFunction (Optional) a function to call when the operation is complete.
             */
            setActiveProcessInstance(processInstanceId: string, callbackFunction?: SetProcessInstanceDelegate): void;

            /**
             * Returns a Stage object representing the active stage.
             * @returns current active stage.
             */
            getActiveStage(): Stage;

            /**
             * Set a stage as the active stage.
             * @param stageId the Id of the stage to make the active stage.
             * @param callbackFunction (Optional) a function to call when the operation is complete.
             */
            setActiveStage(stageId: string, callbackFunction?: ProcessCallbackDelegate): void;

            /**
             * Use this method to get a collection of stages currently in the active path with methods to interact with the
             * stages displayed in the business process flow control. The active path represents stages currently rendered in
             * the process control based on the branching rules and current data in the record.
             * @returns A collection of all completed stages, the currently active stage, and the predicted set of future stages
             *          based on satisfied conditions in the branching rule. This may be a subset of the stages returned with
             *          formContext.data.process.getActiveProcess because it will only include those stages which represent a valid
             *          transition from the current stage based on branching that has occurred in the process.
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            getActivePath(): Collection.ItemCollection<Stage>;

            /**
             * Use this method to asynchronously retrieve the enabled business process flows that the user can switch to for an
             * entity.
             * @param callbackFunction The callback function must accept a parameter that contains an object with
             *                         dictionary properties where the name of the property is the Id of the
             *                         business process flow and the value of the property is the name of the
             *                         business process flow.
             *                         The enabled processes are filtered according to the user’s privileges. The
             *                         list of enabled processes is the same ones a user can see in the UI if they
             *                         want to change the process manually.
             */
            getEnabledProcesses(callbackFunction: (enabledProcesses: ProcessDictionary) => void): void;

            /**
             * Use this method to get the currently selected stage.
             * @returns The currently selected stage.
             */
            getSelectedStage(): Stage;

            /**
             * Use this to add a function as an event handler for the OnPreProcessStatusChange event so that it will be called before the
             * business process flow status changes.
             * @param handler The function will be added to the bottom of the event
             *                handler pipeline. The execution context is automatically
             *                set to be the first parameter passed to the event handler.
             *                Use a reference to a named function rather than an
             *                anonymous function if you may later want to remove the
             *                event handler.
             */
            addOnPreProcessStatusChange(handler: Events.ProcessStatusChangeHandler): void;

            /**
             * Use this to add a function as an event handler for the OnPreStageChange event so that it will be called before the
             * business process flow stage changes.
             * @param handler The function will be added to the bottom of the event
             *                handler pipeline. The execution context is automatically
             *                set to be the first parameter passed to the event handler.
             *                Use a reference to a named function rather than an
             *                anonymous function if you may later want to remove the
             *                event handler.
             */
            addOnPreStageChange(handler: Events.StageChangeEventHandler): void;

            /**
             * Use this to add a function as an event handler for the OnPreProcessStatusChange event so that it will be called when the
             * business process flow status changes.
             * @param handler The function will be added to the bottom of the event
             *                handler pipeline. The execution context is automatically
             *                set to be the first parameter passed to the event handler.
             *                Use a reference to a named function rather than an
             *                anonymous function if you may later want to remove the
             *                event handler.
             */
            addOnProcessStatusChange(handler: Events.ProcessStatusChangeHandler): void;

            /**
             * Use this to add a function as an event handler for the OnStageChange event so that it will be called when the
             * business process flow stage changes.
             * @param handler The function will be added to the bottom of the event
             *                handler pipeline. The execution context is automatically
             *                set to be the first parameter passed to the event handler.
             *                Use a reference to a named function rather than an
             *                anonymous function if you may later want to remove the
             *                event handler.
             */
            addOnStageChange(handler: Events.StageChangeEventHandler): void;

            /**
             * Use this to add a function as an event handler for the OnStageSelected event so that it will be called
             * when a business process flow stage is selected.
             * @param handler The function will be added to the bottom of the event
             *                handler pipeline. The execution context is automatically
             *                set to be the first parameter passed to the event handler.
             *                Use a reference to a named function rather than an
             *                anonymous function if you may later want to remove the
             *                event handler.
             */
            addOnStageSelected(handler: Events.ContextSensitiveHandler): void;

            /**
             * Use this to remove a function as an event handler for the OnPreProcessStatusChange event.
             * @param handler If an anonymous function is set using the addOnPreProcessStatusChange method it
             *                cannot be removed using this method.
             */
            removeOnPreProcessStatusChange(handler: Events.ProcessStatusChangeHandler): void;

            /**
             * Use this to remove a function as an event handler for the OnPreStageChange event.
             * @param handler If an anonymous function is set using the addOnPreStageChange method it
             *                cannot be removed using this method.
             */
            removeOnPreStageChange(handler: Events.StageChangeEventHandler): void;

            /**
             * Use this to remove a function as an event handler for the OnProcessStatusChange event.
             * @param handler If an anonymous function is set using the addOnProcessStatusChange method it
             *                cannot be removed using this method.
             */
            removeOnProcessStatusChange(handler: Events.ProcessStatusChangeHandler): void;

            /**
             * Use this to remove a function as an event handler for the OnStageChange event.
             * @param handler If an anonymous function is set using the addOnStageChange method it
             *                cannot be removed using this method.
             */
            removeOnStageChange(handler: Events.StageChangeEventHandler): void;

            /**
             * Use this to remove a function as an event handler for the OnStageChange event.
             * @param handler If an anonymous function is set using the addOnStageChange method it
             *                cannot be removed using this method.
             */
            removeOnStageSelected(handler: Events.StageSelectedEventHandler): void;

            /**
             * Progresses to the next stage.
             * @param callbackFunction (Optional) A function to call when the operation is complete.
             */
            moveNext(callbackFunction?: ProcessCallbackDelegate): void;

            /**
             * Moves to the previous stage.
             * @param callbackFunction (Optional) A function to call when the operation is complete.
             */
            movePrevious(callbackFunction?: ProcessCallbackDelegate): void;

            /**
             * Use this method to get the unique identifier of the process instance
             * @returns The unique identifier of the process instance
             */
            getInstanceId(): string;

            /**
             * Use this method to get the name of the process instance
             * @returns The name of the process instance
             */
            getInstanceName(): string;

            /**
             * Use this method to get the current status of the process instance
             * @returns The current status of the process
             */
            getStatus(): ProcessStatus;

            /**
             * Use this method to set the current status of the process instance
             * @param status The new status for the process
             * @param callbackFunction (Optional) a function to call when the operation is complete.
             */
            setStatus(status: ProcessStatus, callbackFunction?: ProcessSetStatusDelegate): void;
        }

        /**
         * Called when method to get active processes is complete
         * @param object The result of the get active processes operation.
         * @remarks **Returns object with the following key-value pairs**:
         * * CreatedOn
         * * ProcessDefinitionID
         * * ProcessDefinitionName
         * * ProcessInstanceID
         * * ProcessInstanceName
         * * StatusCodeName
         */
        type GetProcessInstancesDelegate = (object: ProcessDictionary) => void;

        /**
         * Called when method to set active process is complete
         * @param status The result of the set active process operation.
         * @remarks **Values returned are**:
         * * success        (The operation succeeded.)
         * * invalid        (The processInstanceId isn’t valid or the process isn’t enabled.)
         */
        type SetProcessInstanceDelegate = (status: string) => void;

        /**
         * Called when process change methods have completed.
         * @param status The result of the process change operation.
         * @remarks **Values returned are**:
         * * success        (The operation succeeded.)
         * * crossEntity    (The previous stage is for a different entity.)
         * * beginning      (The active stage is the first stage of the active path.)
         * * invalid        (The operation failed because the selected stage isn’t the same as the active stage.)
         * * unreachable    (The stage exists on a different path.)
         */
        type ProcessCallbackDelegate = (status: string) => void;

        /**
         * Called when process set status method has completed.
         * @param status The new status of the process instance: active, aborted, or finished
         */
        type ProcessSetStatusDelegate = (status: ProcessStatus) => void;

        /**
         * Represents a key-value pair, where the key is the Process Flow's ID, and the value is the name thereof.
         */
        interface ProcessDictionary {
            [index: string]: string;
        }
    }

    /**
     * Interface for a user attribute privilege.
     */
    interface Privilege {
        /**
         * True if the user can read.
         */
        canRead: boolean;

        /**
         * True if the user can update.
         */
        canUpdate: boolean;

        /**
         * True if the user can create.
         */
        canCreate: boolean;
    }

    /**
     * An definition module for URL-based, CRM component parameters.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/open-forms-views-dialogs-reports-url External Link: Open forms, views, dialogs, and reports with a URL}
     */
    namespace Url {
        /**
         * Command Bar Display options for Xrm.Url.FormOpenParameters.cmdbar, Xrm.Url.ViewOpenParameters.cmdbar, and Xrm.Utility.FormOpenParameters.cmdbar.
         * @see {@link XrmEnum.CmdBarDisplay}
         */
        type CmdBarDisplay = "true" | "false";

        /**
         * Navigation Bar Display options for Xrm.Url.FormOpenParameters.navbar, Xrm.Url.ViewOpenParameters.navbar, and Xrm.Utility.FormOpenParameters.navbar.
         * @see {@link XrmEnum.NavBarDisplay}
         */
        type NavBarDisplay = "entity" | "off" | "on";

        /**
         * Report Open Action options for Xrm.Url.ReportOpenParameters.actions.
         * @see {@link XrmEnum.ReportAction}
         */
        type ReportAction = "filter" | "run";

        /**
         * Interface for defining parameters on a request to open a form with main.aspx (as with
         * window.open). Useful for parsing the keys and values into a string of the format:
         * "&key=value".
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/open-forms-views-dialogs-reports-url External Link: Open forms, views, dialogs, and reports with a URL}
         * @remarks  A member for "pagetype" is not provided.  The value "entityrecord" is required in
         *           the URL, for forms. Example:  "pagetype=entityrecord"
         */
        interface FormOpenParameters {
            /**
             * The logical name of the entity.
             */
            etn: string;

            /**
             * Additional parameters can be provided to the request. This can only be used to provide
             * default field values for the form, or pass data to custom parameters that have been
             * customized for the form.  See example below for setting the selected form.
             * @example Example:  encodeURIComponent("formid={8c9f3e6f-7839-e211-831e-00155db7d98f}");
             */
            extraqs?: string | undefined;

            /**
             * Controls whether the command bar is displayed.
             * @remarks **Accepted values are**:
             * * "true"    (The command bar is displayed.)
             * * "false"   (The command bar is not displayed.)
             */
            cmdbar?: CmdBarDisplay | undefined;

            /**
             * Controls whether the Navigation bar is displayed on the form.
             * @remarks **Accepted values are**:
             * * "on"      (The navigation bar is displayed.)
             * * "off"     (The navigation bar is not displayed.)
             * * "entity"  (On an entity form, only the navigation options for related entities are available.)
             */
            navbar?: NavBarDisplay | undefined;
        }

        /**
         * Interface for defining parameters on a request to open a view with main.aspx (as with
         * window.open). Useful for parsing the keys and values into a string of the format:
         * "&key=value".
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/open-forms-views-dialogs-reports-url External Link: Open forms, views, dialogs, and reports with a URL}
         * @remarks  A member for "pagetype" is not provided.  The value "entitylist" is required in
         *           the URL, for views. Example:  "pagetype=entitylist"
         */
        interface ViewOpenParameters {
            /**
             * The logical name of the entity.
             */
            etn: string;

            /**
             * The unique identifier of a view, in Guid format, which is valid for the entity described by
             * {@link etn}.
             */
            viewid: string;

            /**
             * The type of view identified by {@link viewid}.
             * @remarks **Accepted values are**:
             * * 1039    System View
             * * 4230    User View.
             */
            viewtype: XrmEnum.ViewType;

            /**
             * Controls whether the command bar is displayed.
             * @remarks **Accepted values are**:
             * * "true"    (The command bar is displayed.)
             * * "false"   (The command bar is not displayed.)
             */
            cmdbar?: CmdBarDisplay | undefined;

            /**
             * Controls whether the Navigation bar is displayed on the form.
             * @remarks **Accepted values are**:
             * * "on"      (The navigation bar is displayed.)
             * * "off"     (The navigation bar is not displayed.)
             * * "entity"  (On an entity form, only the navigation options for related entities are available.)
             */
            navbar?: NavBarDisplay | undefined;
        }

        /**
         * Interface for defining parameters of a request to open a dialog with rundialog.aspx (as with
         * window.open).  Useful for parsing the keys and values into a string of the format:
         * "&key=value".
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/open-forms-views-dialogs-reports-url External Link: Open forms, views, dialogs, and reports with a URL}
         */
        interface DialogOpenParameters {
            /**
             * The unique identifier of the dialog, in Guid format, which is valid for the entity described
             * by: {@link EntityName}
             */
            DialogId: string;

            /**
             * The logical name of the entity.
             */
            EntityName: string;

            /**
             * The unique identifier for the targeted record.
             */
            ObjectId: string;
        }

        /**
         * Interface for defining parameters of a request to open a report with viewer.apsx (as with
         * window.open).  Useful for parsing out the keys and values into a string of the format:
         * "&key=value"
         *
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/open-forms-views-dialogs-reports-url External Link: Open forms, views, dialogs, and reports with a URL}
         */
        interface ReportOpenParameters {
            /**
             * The action to perform, as either "run" or "filter".
             * @remarks **Actions**:
             * * "run"       Executes the report with default filters.
             * * "filter"    Presents the user with the filter editor, and a "Run Report" button.
             */
            action: ReportAction;

            /**
             * The file name of the report.  For out-of-box reports, this parameter enables context-sensitive
             * help.
             */
            helpID?: string | undefined;

            /**
             * The unique identifier, held in the report's 'reportid' attribute, in Guid format.
             */
            id: string;
        }
    }

    /**
     * The Xrm.Utility API
     *
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility External Link: Xrm.Utility (Client API reference)}
     */
    namespace Utility {
        /**
         * Interface use to provide parameters when opening new entiy forms
         */
        interface OpenParameters {
            /**
             * Additional parameters can be provided to the request, by overloading
             * this object with additional key and value pairs. This can only be used
             * to provide default field values for the form, or pass data to custom
             * parameters that have been customized for the form.
             */
            [index: string]: string | undefined;
        }

        /**
         * Interface for defining parameters on a Xrm.Utility.openEntityForm() request.
         */
        interface FormOpenParameters extends OpenParameters {
            /**
             * The identifier of the form to use, when several are available.
             */
            formid?: string | undefined;

            /**
             * Controls whether the Navigation bar is displayed on the form.
             * @remarks **Accepted values are**:
             * * "on"      (The navigation bar is displayed.)
             * * "off"     (The navigation bar is not displayed.)
             * * "entity"  (On an entity form, only the navigation options for related entities are available.)
             */
            navbar?: Url.NavBarDisplay | undefined;

            /**
             * Controls whether the command bar is displayed.
             * @remarks **Accepted values are**:
             * * "true"    (The command bar is displayed.)
             * * "false"   (The command bar is not displayed.)
             */
            cmdbar?: Url.CmdBarDisplay | undefined;
        }

        /**
         * Interface for window options.
         */
        interface WindowOptions {
            /**
             * Direct the form to open in a new window.
             */
            openInNewWindow: boolean;
        }
    }

    /**
     * Namespace to hold Xrm.Navigation related types
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-navigation External Link: Xrm.Navigation (Client API reference)}
     */
    namespace Navigation {
        interface AlertStrings {
            /**
             * (Optional) The confirm button label.If you do not specify the button label, OK is used as the button label.
             */
            confirmButtonLabel?: string | undefined;
            /**
             *  The message to be displyed in the alert dialog.
             */
            text: string;
            /**
             * (Optional) The title of the alert dialog.
             */
            title?: string | undefined;
        }

        interface ConfirmStrings {
            /**
             * (Optional) The cancel button label. If you do not specify the cancel button label, Cancel is used as the button label.
             */
            cancelButtonLabel?: string | undefined;

            /**
             * (Optional) The confirm button label.If you do not specify the button label, OK is used as the button label.
             */
            confirmButtonLabel?: string | undefined;

            /**
             * (Optional) The subtitle to be displayed in the confirmation dialog.
             */
            subtitle?: string | undefined;

            /**
             * (Optional) The title to be displyed in the confirmation dialog.
             */
            title?: string | undefined;

            /**
             * The message to be displyed in the alert dialog.
             */
            text: string;
        }

        /**
         * An object describing whether to open or save the file
         */
        interface OpenFileOptions {
            /**
             * If you do not specify this parameter, by default 1 (open) is passed.
             * This parameter is only supported on Unified Interface
             */
            openMode?: XrmEnum.OpenFileOptions;
        }

        interface DialogSizeOptions {
            /**
             * Height of the alert dialog in pixels.
             */
            height: number;
            /**
             * Width of the alert dialog pixels.
             */
            width: number;
        }

        interface OpenWebresourceOptions extends DialogSizeOptions {
            /**
             * Indicates whether to open the web resource in a new window.
             */
            openInNewWindow: boolean;
        }

        /**
         * An object with the confirmed (Boolean) attribute is passed that indicates whether the confirm button was clicked to close the dialog.
         */
        interface ConfirmResult {
            /**
             * true if the confirm button was clicked to close the dialog.
             */
            confirmed: boolean;
        }

        interface OpenFormResult {
            /**
             * Identifies the record displayed or created
             */
            savedEntityReference: LookupValue[];
        }

        /**
         * Details to show in the Error dialog
         */
        interface ErrorDialogOptions {
            /**
             * Details about the error. When you specify this, the Download Log File button is available in the error message,
             * and clicking it will let users download a text file with the content specified in this attribute.
             */
            details?: string | undefined;
            /**
             * The error code. If you just set errorCode, the message for the error code is automatically
             * retrieved from the server and displayed in the error dialog.
             * If you specify an invalid errorCode value, an error dialog with a default error message is displyed.
             */
            errorCode?: number | undefined;
            /**
             *  The message to be displayed in the error dialog.
             */
            message?: string | undefined;
        }

        interface FileDetails {
            /**
             * Contents of the file.
             */
            fileContent: string;
            /**
             * Name of the file.
             */
            fileName: string;
            /**
             * Size of the file in KB.
             */
            fileSize: number;
            /**
             * String. MIME type of the file.
             */
            mimeType: string;
        }

        /**
         * Entity form options for opening the form
         */
        interface EntityFormOptions {
            /**
             * Indicates whether to display the command bar.If you do not specify this parameter, the command bar is displayed by default.
             */
            cmdbar?: boolean | undefined;
            /**
             * Designates a record that will provide default values based on mapped attribute values.The lookup object has the following String properties: entityType, id, and name (optional).
             */
            createFromEntity?: LookupValue | undefined;
            /**
             * ID of the entity record to display the form for.
             */
            entityId?: string | undefined;
            /**
             * Logical name of the entity to display the form for.
             */
            entityName?: string | undefined;
            /**
             * ID of the form instance to be displayed.
             */
            formId?: string | undefined;
            /**
             * Height of the form window to be displayed in pixels.
             */
            height?: number | undefined;
            /**
             * Undocumented at this time
             */
            isCrossEntityNavigate?: boolean | undefined;
            /**
             * Undocumented at this time
             */
            isOfflineSyncError?: boolean | undefined;
            /**
             * Controls whether the navigation bar is displayed and whether application navigation is available using the areas and subareas defined in the sitemap.Valid vlaues are: "on", "off", or "entity".
             * * on: The navigation bar is displayed.This is the default behavior if the navBar parameter is not used.
             * * off: The navigation bar is not displayed.People can navigate using other user interface elements or the back and forward buttons.
             * * entity: On an entity form, only the navigation options for related entities are available.After navigating to a related entity, a back button is displayed in the navigation bar to allow returning to the original record.
             */
            navBar?: Url.NavBarDisplay | undefined;
            /**
             * Indicates whether to display form in a new window.
             */
            openInNewWindow?: boolean | undefined;
            /**
             * Specify one of the following values for the window position of the form on the screen:
             * * 1:center
             * * 2:side
             */
            windowPosition?: XrmEnum.WindowPositions | undefined;
            /**
             * ID of the business process to be displayed on the form.
             */
            processId?: string | undefined;
            /**
             * ID of the business process instance to be displayed on the form.
             */
            processInstanceId?: string | undefined;
            /**
             * Define a relationship object to display the related records on the form.
             */
            relationship?: Relationship | undefined;
            /**
             * ID of the selected stage in business process instance.
             */
            selectedStageId?: string | undefined;
            /**
             * Indicates whether to open a quick create form.
             */
            useQuickCreateForm?: boolean | undefined;
            /**
             * Width of the form window to be displayed in pixels.
             */
            width?: number | undefined;
        }

        interface Relationship {
            /**
             * Name of the attribute used for relationship.
             */
            attributeName: string;
            /**
             * Name of the relationship.
             */
            name: string;
            /**
             * Name of the navigation property for this relationship.
             */
            navigationPropertyName?: string | undefined;
            /**
             * Relationship type.Specify one of the following values:
             * * 0:OneToMany
             * * 1:ManyToMany
             */
            relationshipType?: XrmEnum.RelationshipType | undefined; //
            /**
             * Role type in relationship.Specify one of the following values:
             * * 1:Referencing
             * * 2:AssociationEntity
             */
            roleType?: XrmEnum.RoleType | undefined;
        }

        interface PageInputEntityRecord {
            pageType: "entityrecord";
            /**
             * Logical name of the entity to display the form for.
             */
            entityName: string;
            /**
             * ID of the entity record to display the form for. If you don't specify this value, the form will be opened in create mode.
             */
            entityId?: string | undefined;
            /**
             * Designates a record that will provide default values based on mapped attribute values. The lookup object has the following String properties: entityType, id, and name (optional).
             */
            createFromEntity?: LookupValue | undefined;
            /**
             * A dictionary object that passes extra parameters to the form. Invalid parameters will cause an error.
             */
            data?: { [attributeName: string]: any } | undefined;
            /**
             * ID of the form instance to be displayed.
             */
            formId?: string | undefined;
            /**
             * Indicates whether the form is navigated to from a different entity using cross-entity business process flow.
             */
            isCrossEntityNavigate?: boolean | undefined;
            /**
             * Indicates whether there are any offline sync errors.
             */
            isOfflineSyncError?: boolean | undefined;
            /**
             * ID of the business process to be displayed on the form.
             */
            processId?: string | undefined;
            /**
             * ID of the business process instance to be displayed on the form.
             */
            processInstanceId?: string | undefined;
            /**
             * Define a relationship object to display the related records on the form.
             */
            relationship?: Relationship | undefined;
            /**
             * ID of the selected stage in business process instance.
             */
            selectedStageId?: string | undefined;
            /**
             * Sets the focus on the tab of the form.
             */
            tabName?: string | undefined;
        }

        interface PageInputEntityList {
            pageType: "entitylist";
            /**
             * The logical name of the entity to load in the list control.
             */
            entityName: string;
            /**
             * The ID of the view to load. If you don't specify it, navigates to the default main view for the entity.
             */
            viewId?: string | undefined;
            /**
             * Type of view to load. Specify "savedquery" or "userquery".
             */
            viewType?: "savedquery" | "userquery" | undefined;
        }

        interface CustomPage {
            pageType: "custom";
            /**
             * The logic name o the custom page to open.
             */
            name: string;
            /**
             * The logical name of the table to be made available in the custom page via Param("entityName").
             */
            entityName?: string | undefined;
            /**
             * ID of the table record to be made available in the custom page via Param("recordId").
             */
            recordId?: string | undefined;
        }

        interface PageInputHtmlWebResource {
            pageType: "webresource";
            /**
             * The name of the web resource to load.
             */
            webresourceName: string;
            /**
             * The data to pass to the web resource.
             */
            data?: string | undefined;
        }

        interface Dashboard {
            pageType: "dashboard";
            /**
             * The GUID of the dashboard to load. If not specified, navigates to the default dashboard
             */
            dashboardId?: string | undefined;
        }

        /**
         * Options for navigating to a page: whether to open inline or in a dialog. If you don't specify this parameter, page is opened inline by default.
         */
        interface NavigationOptions {
            /**
             * Specify 1 to open the page inline; 2 to open the page in a dialog.
             * Entity lists can only be opened inline; web resources can be opened either inline or in a dialog.
             */
            target: 1 | 2;
            /**
             * The width of dialog. To specify the width in pixels, just type a numeric value. To specify the width in percentage, specify an object of type
             */
            width?: number | NavigationOptions.SizeValue | undefined;
            /**
             * The width of dialog. To specify the width in pixels, just type a numeric value. To specify the width in percentage, specify an object of type
             */
            height?: number | NavigationOptions.SizeValue | undefined;
            /**
             * Specify 1 to open the dialog in center; 2 to open the dialog on the side. Default is 1 (center).
             */
            position?: 1 | 2 | undefined;
            /*
             * The dialog title on top of the center or side dialog.
             */
            title?: string | undefined;
        }

        namespace NavigationOptions {
            interface SizeValue {
                /**
                 * The numerical value
                 */
                value: number;
                /**
                 * The unit of measurement. Specify "%" or "px". Default value is "px"
                 */
                unit: "%" | "px";
            }
        }
    }

    /**
     * Interface for the Xrm.Navigation API
     */
    interface Navigation {
        /**
         * Navigates to the specified page.
         * @param pageInput Input about the page to navigate to. The object definition changes depending on the type of page to navigate to: entity list or HTML web resource.
         * @param navigationOptions Options for navigating to a page: whether to open inline or in a dialog. If you don't specify this parameter, page is opened inline by default.
         */
        navigateTo(
            pageInput:
                | Navigation.PageInputEntityRecord
                | Navigation.PageInputEntityList
                | Navigation.CustomPage
                | Navigation.PageInputHtmlWebResource
                | Navigation.Dashboard,
            navigationOptions?: Navigation.NavigationOptions,
        ): Async.PromiseLike<any>;

        /**
         * Displays an alert dialog containing a message and a button.
         * @param alertStrings The strings to be used in the alert dialog.
         * @param alertOptions The height and width options for alert dialog
         */
        openAlertDialog(
            alertStrings: Navigation.AlertStrings,
            alertOptions?: Navigation.DialogSizeOptions,
        ): Async.PromiseLike<any>;

        /**
         * Displays a confirmation dialog box containing a message and two buttons.
         * @param confirmStrings The strings to be used in the confirm dialog.
         * @param confirmOptions The height and width options for alert dialog
         */
        openConfirmDialog(
            confirmStrings: Navigation.ConfirmStrings,
            confirmOptions?: Navigation.DialogSizeOptions,
        ): Async.PromiseLike<Navigation.ConfirmResult>;

        /**
         * Displays an error dialog.
         * @param errorOptions An object to specify the options for error dialog.
         */
        openErrorDialog(errorOptions: Navigation.ErrorDialogOptions): Async.PromiseLike<any>;

        /**
         * Opens a file.
         */
        openFile(file: Navigation.FileDetails, openFileOptions?: Navigation.OpenFileOptions): void;

        /**
         * Opens an entity form or a quick create form.
         */
        openForm(
            entityFormOptions: Navigation.EntityFormOptions,
            formParameters?: Utility.OpenParameters,
        ): Async.PromiseLike<Navigation.OpenFormResult>;

        /**
         * Opens a URL, including file URLs.
         * @param url URL to open.
         * @param openUrlOptions Options to open the URL
         */
        openUrl(url: string, openUrlOptions?: Navigation.DialogSizeOptions): void;

        /**
         * Opens an HTML web resource.
         * @param webResourceName Name of the HTML web resource.
         * @param windowOptions (Optional) Window options for opening the web resource.
         *                                                 It is advised to use encodeURIcomponent() to encode the value.
         */
        openWebResource(
            webResourceName: string,
            windowOptions?: Navigation.OpenWebresourceOptions,
            data?: string,
        ): void;
    }

    /**
     * Namespace to hold the Metadata types
     */
    namespace Metadata {
        /**
         * Types returned by a call to getEntityMetadata
         */
        interface EntityMetadata {
            ActivityTypeMask: number;
            /**
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            Attributes: Collection.StringIndexableItemCollection<AttributeMetadata>;
            AutoRouteToOwnerQueue: boolean;
            CanEnableSyncToExternalSearchIndex: boolean;
            CanBeInManyToMany: boolean;
            CanBePrimaryEntityInRelationship: boolean;
            CanBeRelatedEntityInRelationship: boolean;
            CanCreateAttributes: boolean;
            CanCreateCharts: boolean;
            CanCreateForms: boolean;
            CanCreateViews: boolean;
            CanModifyAdditionalSettings: boolean;
            CanTriggerWorkflow: boolean;
            Description: Label;
            DisplayCollectionName: Label;
            DisplayName: Label;
            EntityColor: string;
            EntitySetName: string;
            IconLargeName: string;
            IconMediumName: string;
            IconSmallName: string;
            IsActivity: boolean;
            IsActivityParty: boolean;
            IsAuditEnabled: boolean;
            IsAvailableOffline: boolean;
            IsBPFEntity: boolean;
            IsChildEntity: boolean;
            IsConnectionsEnabled: boolean;
            IsCustomEntity: boolean;
            IsCustomizable: boolean;
            IsDocumentManagementEnabled: boolean;
            IsDuplicateDetectionEnabled: boolean;
            IsEnabledForCharts: boolean;
            IsOneNotIntegrationEnabled: boolean;
            IsOptimisitcConcurrencyEnabled: boolean;
            IsQuickCreateEnabled: boolean;
            IsImportable: boolean;
            IsIntersect: boolean;
            IsMailMergeEnabled: boolean;
            IsManaged: boolean;
            IsMappable: boolean;
            IsReadingPaneEnabled: boolean;
            IsRenameable: boolean;
            IsStateModelAware: boolean;
            IsValidForAdvancedFind: boolean;
            IsValidForQueue: boolean;
            IsVisibleInMobileClient: boolean;
            LogicalCollectionName: string;
            LogicalName: string;
            ObjectTypeCode: number;
            OwnershipTypeCode: number;
            PrimaryIdAttribute: string;
            PrimaryNameAttribute: string;
            RecurrenceBaseEntityLogicalName: string;
            PrimaryImageAttribute: string;
        }

        /**
         * Type to hold Labels as part of the EntityMetadata
         */
        interface Label {
            /**
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            LocalizedLabels: LocalizedLabel[];
            UserLocalizedLabel: LocalizedLabel;
        }

        /**
         * Type to hold a Label as part of the EntityMetadata
         */
        interface LocalizedLabel {
            Label: string;
            LanguageCode: number;
        }

        /**
         * Type to hold the Attribute metadata as part of the EntityMetadata
         */
        interface AttributeMetadata {
            DefaultFormValue: number;
            /**
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            LogicalName: string;
            DisplayName: string;
            AttributeType: XrmEnum.AttributeTypeCode;
            EntityLogicalName: string;
            /**
             * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/collections External Link: Collections (Client API reference)}
             */
            OptionSet: OptionMetadata[];
        }

        /**
         * Type to hold the optionset metadata as part of the EntityMetadata
         */
        interface OptionMetadata {
            Value: number;
            Color: string;
            IsManaged: boolean;
            ExternalValue: any;
            MetadataId: string;
            HasChanged: boolean;
            State: number;
            TransitionData: any;
            Label: Label;
            Description: Label;
        }
    }

    /**
     * Namespace to hold Xrm.Device related types
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-device External Link: Xrm.Device (Client API reference)}
     */
    namespace Device {
        /**
         * Xrm.Device.captureAudio/captureImage/captureVideo response
         */
        interface CaptureFileResponse {
            /**
             * Base64 encoded contents of the file.
             */
            fileContent: string;
            /**
             * Name of the audio file.
             */
            fileName: string;
            /**
             * Size of the file in KB.
             */
            fileSize: number;
            /**
             * File MIME type.
             */
            mimeType: string;
        }

        /**
         * Options for Xrm.Device.captureImage
         */
        interface CaptureImageOptions {
            /**
             * Indicates whether to edit the image before saving.
             */
            allowEdit: boolean;
            /**
             * Height of the image to capture.
             */
            height: number;
            /**
             * Indicates whether to capture image using the front camera of the device.
             */
            preferFrontCamera: boolean;
            /**
             * Quality of the image file in percentage. Number.
             */
            quality: number;
            /**
             * Width of the image to capture
             */
            width: number;
        }

        /**
         * Interface for Xrm.Device.getCurrentPosition response
         */
        interface GetCurrentPositionResponse {
            /**
             * Contains a set of geographic coordinates along with associated accuracy as well as a set of other optional attributes such as altitude and speed.
             */
            coords: any;
            /**
             * Represents the time when the object was acquired and is represented as DOMTimeStamp.
             */
            timestamp: number;
        }

        /**
         * Posible file types for Xrm.Device.pickFile options
         * @see {@link XrmEnum.DevicePickFileType}
         */
        type PickFileTypes = "audio" | "video" | "image";

        /**
         * Interface for Xrm.Device.pickFile options
         */
        interface PickFileOptions {
            /**
             * Image file types to select.
             */
            accept?: PickFileTypes;
            /**
             * Indicates whether to allow selecting multiple files.
             */
            allowMultipleFiles?: boolean;
            /**
             * Maximum size of the files(s) to be selected.
             */
            maximumAllowedFileSize?: number;
        }
    }

    /**
     * Interface for Xrm.Device API
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-device External Link: Xrm.Device (Client API reference)}
     */
    interface Device {
        /**
         * Invokes the device microphone to record audio.
         * @returns On success, returns Base64 encoded file
         */
        captureAudio(): Async.PromiseLike<Device.CaptureFileResponse>;

        /**
         * Invokes the device camera to capture an image.
         * @returns On success, returns Base64 encoded file
         */
        captureImage(imageOptions?: Device.CaptureImageOptions): Async.PromiseLike<Device.CaptureFileResponse>;

        /**
         * Invokes the device camera to capture video.
         * @returns On success, returns Base64 encoded file
         */
        captureVideo(): Async.PromiseLike<Device.CaptureFileResponse>;

        /**
         * Invokes the device camera to scan the barcode information, such as a product number.
         * @returns On success, Barcode value is returned as a String
         */
        getBarcodeValue(): Async.PromiseLike<string>;

        /**
         * Returns the current location using the device geolocation capability.
         * @returns On success, returns current geolocation information
         */
        getCurrentPosition(): Async.PromiseLike<Device.GetCurrentPositionResponse>;

        /**
         * Opens a dialog box to select files from your computer (web client) or mobile device (mobile clients).
         * @returns On success, returns an array of files
         */
        pickFile(pickFileOptions?: Device.PickFileOptions): Async.PromiseLike<Device.CaptureFileResponse[]>;
    }

    /**
     * Interface for Xrm.Encoding API
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-encoding External Link: Xrm.Encoding (Client API reference)}
     */
    interface Encoding {
        /**
         * Encodes the specified string so that it can be used in HTML.
         * @param arg String to be encoded.
         * @returns Encoded string
         */
        htmlAttributeEncode(arg: string): string;

        /**
         * Converts a string that has been HTML-encoded into a decoded string.
         * @param arg HTML-encoded string to be decoded.
         * @returns Decoded string
         */
        htmlDecode(arg: string): string;

        /**
         * Converts a string to an HTML-encoded string.
         * @param arg String to be encoded.
         * @returns Encoded string
         */
        htmlEncode(arg: string): string;

        /**
         * Applies attribute encoding to a string.
         * @param arg String to be encoded.
         * @returns Encoded string.
         */
        xmlAttributeEncode(arg: string): string;

        /**
         * Applies XML encoding to a string.
         * @param arg String to be encoded.
         * @returns Encoded string.
         */
        xmlEncode(arg: string): string;
    }

    /**
     * Provides properties and methods to use Web API to create and manage records and execute Web API actions and functions in Customer Engagement.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi External Link: Xrm.WebApi (Client API reference)}
     */
    interface WebApi extends WebApiOffline {
        /**
         * Returns a boolean value indicating whether an entity is offline enabled.
         * @param entityLogicalName    Logical name of the entity. For example: "account".
         * @returns true if the entity is offline enabled; otherwise false.
         */
        isAvailableOffline(entityLogicalName: string): boolean;

        /**
         * Provides methods to use Web API to create and manage records and execute Web API actions and functions in Customer Engagement when connected to the Customer Engagement server (online mode).
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online External Link: Xrm.WebApi.online (Client API reference)}
         */
        online: WebApiOnline;

        /**
         * Provides methods to create and manage records in the Dynamics 365 Customer Engagement mobile clients while working in the offline mode.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline External Link: Xrm.WebApi.offline (Client API reference)}
         */
        offline: WebApiOffline;
    }

    /**
     * Interface for the {@link Xrm.WebApi.online} API
     * Execute and ExecuteMultiple are only available when online, not offline.
     */
    interface WebApiOnline extends WebApiOffline {
        /**
         * Execute a single action, function, or CRUD operation.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/execute External Link: Xrm.WebApi.online.execute (Client API reference)}
         * @param request Object that will be passed to the Web API endpoint to execute an action, function, or CRUD request.
         * @remarks The object exposes a getMetadata method that lets you define the metadata for the action, function or CRUD request you want to execute.<BR>
         * **The getMetadata method has the following parameters**:
         *   - boundParameter: (Optional) String. The name of the bound parameter for the action or function to execute.
         *       * Specify undefined if you are executing a CRUD request.
         *       * Specify null if the action or function to execute is not bound to any entity.
         *       * Specify entity logical name or entity set name in case the action or function to execute is bound to one.
         *   - operationName: (Optional). String. Name of the action, function, or one of the following values if you are executing a CRUD request: "Create", "Retrieve", "RetrieveMultiple", "Update", or "Delete".
         *   - operationType: (Optional). Number. Indicates the type of operation you are executing; specify one of the following values:
         *       * 0: Action
         *       * 1: Function
         *       * 2: CRUD
         *   - parameterTypes: Object. The metadata for parameter types. The object has the following attributes:
         *   - enumProperties: (Optional) Object. The metadata for enum types. The object has two string attributes: name and value
         *   - structuralProperty: Number. The category of the parameter type. Specify one of the following values:
         *       * 0: Unknown
         *       * 1: PrimitiveType
         *       * 2: ComplexType
         *       * 3: EnumerationType
         *       * 4: Collection
         *       * 5: EntityType
         *   - typeName: String. The fully qualified name of the parameter type.
         */
        execute(request: any): Async.PromiseLike<ExecuteResponse>;

        /**
         * Execute a collection of action, function, or CRUD operations.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple External Link: Xrm.WebApi.online.executeMultiple (Client API reference)}
         * @param request   An array of one of one of the following types:
         *    -objects where each object is an action, function, or CRUD request that you want to execute
         *        * against the Web API endpoint. Each object exposes a getMetadata method that lets you define
         *        the metadata for the action, function or CRUD request you want to execute. This is the same
         *        object that you pass in the execute method. For information about the object, see execute.
         *    -change set (an array of objects), where each object in the change set is as defined above.
         *        * In this case, all the request objects specified in the change set will get executed in a
         *        transaction.
         */
        executeMultiple(request: any[]): Async.PromiseLike<ExecuteResponse[]>;
    }

    /**
     * Interface for the Xrm.WebApi.offline API
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline External Link: Xrm.WebApi.offline (Client API reference)}
     */
    interface WebApiOffline {
        /**
         * Creates an entity record
         * @param entityLogicalName Logical name of the entity you want to create. For example: "account".
         * @param record A JSON object defining the attributes and values for the new entity record.
         * @returns On success, returns a promise object containing the attributes specified earlier in the description of the successCallback parameter.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/createrecord External Link: createRecord (Client API reference)}
         */
        createRecord(entityLogicalName: string, record: any): Async.PromiseLike<CreateResponse>;

        /**
         * Deletes an entity record.
         * @param entityLogicalName The entity logical name of the record you want to delete. For example: "account".
         * @param id GUID of the entity record you want to delete.
         * @returns On success, returns a promise object containing the attributes specified earlier in the description of the successCallback parameter.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/deleterecord External Link: deleteRecord (Client API reference)}
         */
        deleteRecord(entityLogicalName: string, id: string): Async.PromiseLike<string>;

        /**
         * Retrieves an entity record.
         * @param entityLogicalName The entity logical name of the record you want to retrieve. For example: "account".
         * @param id GUID of the entity record you want to retrieve.
         * @param options (Optional) OData system query options, $select and $expand, to retrieve your data.
         * - Use the $select system query option to limit the properties returned by including a comma-separated
         *   list of property names. This is an important performance best practice. If properties aren’t
         *   specified using $select, all properties will be returned.
         * - Use the $expand system query option to control what data from related entities is returned. If you
         *   just include the name of the navigation property, you’ll receive all the properties for related
         *   records. You can limit the properties returned for related records using the $select system query
         *   option in parentheses after the navigation property name. Use this for both single-valued and
         *   collection-valued navigation properties.
         * - You can also specify multiple query options by using & to separate the query options.
         * @example <caption>options example:</caption>
         * options: $select=name&$expand=primarycontactid($select=contactid,fullname)
         * @returns On success, returns a promise containing a JSON object with the retrieved attributes and their values.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/retrieverecord External Link: retrieveRecord (Client API reference)}
         */
        retrieveRecord<T = any>(entityLogicalName: string, id: string, options?: string): Async.PromiseLike<T>;

        /**
         * Retrieves a collection of entity records.
         * @param entityLogicalName The entity logical name of the records you want to retrieve. For example: "account".
         * @param options (Optional) OData system query options or FetchXML query to retrieve your data.
         * * Following system query options are supported: $select, $top, $filter, $expand, and $orderby.
         * * To specify a FetchXML query, use the fetchXml attribute to specify the query.
         * * NOTE: You must always use the $select system query option to limit the properties returned for an entity
         * record by including a comma-separated list of property names. This is an important performance best practice.
         * * If properties aren’t specified using $select, all properties will be returned.
         * * You can specify multiple system query options by using & to separate the query options.
         * @param maxPageSize (Optional) Specify a positive number that indicates the number of entity records to be returned per page.
         * * If you do not specify this parameter, the default value is passed as 5000. If the number of records being retrieved is more than the specified
         * maxPageSize value, nextLink attribute in the returned promise object will contain a link to retrieve the next set of entities.
         * @returns On success, returns a promise object containing the attributes specified earlier in the description of the successCallback parameter.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/retrievemultiplerecords External Link: retrieveMultipleRecords (Client API reference)}
         */
        retrieveMultipleRecords<T = any>(
            entityLogicalName: string,
            options?: string,
            maxPageSize?: number,
        ): Async.PromiseLike<RetrieveMultipleResult<T>>;

        /**
         * Updates an entity record.
         * @param entityLogicalName The entity logical name of the record you want to update. For example: "account".
         * @param id GUID of the entity record you want to update.
         * @param data A JSON object containing key: value pairs, where key is the property of the entity and value is the value of the property you want update.
         * @returns On success, returns a promise object containing the attributes specified earlier in the description of the successCallback parameter.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/updaterecord External Link: updateRecord (Client API reference)}
         */
        updateRecord(entityLogicalName: string, id: string, data: any): Async.PromiseLike<UpdateResponse>;
    }

    /**
     * Interface for the WebAPI CreateRecord request response
     */
    interface CreateResponse {
        entityType: string;
        id: string;
    }

    /**
     * Interface for the WebAPI UpdateRecord request response
     */
    interface UpdateResponse {
        entityType: string;
        id: string;
    }

    /**
     * Interface for the Promise error response arguments
     */
    interface ErrorResponse {
        errorCode: number;
        message: string;
    }

    /**
     * Interface for the WebAPI RetrieveMultiple request response
     */
    interface RetrieveMultipleResult<T = any> {
        /**
         * An array of JSON objects, where each object represents the retrieved entity record containing attributes and their values as key: value pairs. The Id of the entity record is retrieved by default.
         */
        entities: T[];
        /**
         * If the number of records being retrieved is more than the value specified in the maxPageSize parameter, this attribute returns the URL to return next set of records.
         */
        nextLink: string;
    }

    /**
     * Namespace to hold Xrm.App related types
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-app External Link: Xrm.App (Client API reference)}
     */
    namespace App {
        /**
         * Defines the action of notification
         * @see {@link Xrm.App.Notification}
         */
        interface Action {
            /**
             * The label for the action in the message.
             */
            actionLabel?: string;
            /**
             * The function to execute when the action label is clicked.
             */
            eventHandler?: () => void;
        }

        /**
         * Defines the notification object for Xrm.App.addGlobalNotification
         * @see {@link Xrm.App.addGlobalNotification}
         */
        interface Notification {
            /**
             * @see {@link Xrm.App.Action}
             */
            action?: Action;
            /**
             * Defines the level of notification.
             */
            level: XrmEnum.AppNotificationLevel;
            /**
             * The message to display in the notification.
             */
            message: string;
            /**
             * Indicates whether or not the user can close or dismiss the notification. If you don't specify this parameter, users can't close or dismiss the notification by default.
             */
            showCloseButton?: boolean;
            /**
             * Defines the type of notification. Currently, only a value of 2 is supported, which displays a message bar at the top of the app.
             */
            type: number;
        }

        /**
         * Defines single side pane.
         * @see {@link Xrm.App.sidePanes.createPane}
         */
        interface PaneOptions {
            /**
             * The title of the pane. Used in pane header and for tooltip.
             */
            title?: string;
            /**
             * The ID of the new pane. If the value is not passed, the ID value is auto-generated.
             */
            paneId?: string;
            /**
             * Whether the pane header will show a close button or not.
             */
            canClose?: boolean;
            /**
             * The path of the icon to show in the panel switcher control.
             */
            imageSrc?: string;
            /**
             * Hides the header pane, including the title and close button. Default value is false.
             */
            hideHeader?: boolean;
            /**
             * When set to false, the created pane is not selected and leaves the existing pane selected. It also does not expand the pane if collapsed.
             */
            isSelected?: boolean;
            /**
             * The width of the pane in pixels.
             */
            width?: number;
            /**
             * Hides the pane and tab.
             */
            hidden?: boolean;
            /**
             * Prevents the pane from unmounting when it is hidden.
             */
            alwaysRender?: boolean;
            /**
             * Prevents the badge from getting cleared when the pane becomes selected.
             */
            keepBadgeOnSelect?: boolean;
        }

        /**
         * Defines methods single side pane.
         */
        interface PaneObject extends Omit<PaneOptions, "isSelected" | "hideHeader"> {
            /**
             * Closes the side pane and removes it from the side bar.
             */
            close(): void;

            /**
             * Specify whether the pane should be selected or expanded.
             */
            select(): void;

            /**
             * Opens a page within the selected pane. This is similar to the navigateTo method.
             */
            navigate(
                pageInput:
                    | Navigation.PageInputEntityRecord
                    | Navigation.PageInputEntityList
                    | Navigation.CustomPage
                    | Navigation.PageInputHtmlWebResource
                    | Navigation.Dashboard,
                navigationOptions?: Navigation.NavigationOptions,
            ): Async.PromiseLike<any>;
        }
    }

    /**
     * Interface for Xrm.App API
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-app External Link: Xrm.App (Client API reference)}
     */
    interface App {
        /**
         * Displays an error, information, warning, or success notification for an app, and lets you specify actions to execute based on the notification.
         * @param notification The notification to add.
         * @returns On success, returns a promise object containing a GUID value to uniquely identify the notification as described earlier in the description of the successCallback parameter.
         */
        addGlobalNotification(notification: App.Notification): Async.PromiseLike<string>;

        /**
         * Clears a notification in the app.
         * @param uniqueId The ID to use to clear a specific notification that was set using addGlobalNotification.
         * @returns On success, returns a promise object.
         */
        clearGlobalNotification(uniqueId: string): Async.PromiseLike<string>;

        /**
         * Provides methods for managing side panes.
         * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-app-sidepanes External Link: sidePanes (Client API reference)}
         */
        sidePanes: {
            /**
             * @returns whether the selected pane is collapsed or expanded.
             */
            state: number;

            /**
             * Provides all the information to create side panes.
             * @param paneOptions The ID to use to clear a specific notification that was set using addGlobalNotification.
             */
            createPane(paneOptions?: App.PaneOptions): Async.PromiseLike<App.PaneObject>;

            /**
             * @returns a collection containing all active panes.
             */
            getAllPanes(): App.PaneObject[];

            /**
             * @param panelId string
             * @returns the side pane corresponding to the input ID. If the side pane does not exist, undefined is returned.
             */
            getPane(panelId: string): App.PaneObject | undefined;

            /**
             * @returns the currently selected pane.
             */
            getSelectedPane(): App.PaneObject;
        };
    }

    /**
     * Interface for the WebAPI Execute request response
     */
    interface ExecuteResponse extends Response {}
}

declare namespace XrmEnum {
    /**
     * Enumeration of entity form states/types.
     */
    const enum FormType {
        Undefined = 0,
        Create = 1,
        Update = 2,
        ReadOnly = 3,
        Disabled = 4,
        BulkEdit = 6,
        /**
         * @deprecated QuickCreate has been deprecated
         */
        QuickCreate = 5,
        /**
         * @deprecated ReadOptimized has been deprecated.
         */
        ReadOptimized = 11,
    }

    /**
     * Possible state of form data load.
     * @see {@link https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/executioncontext/geteventargs#return-value External Link: getEventArgs (Client API reference)}
     */
    const enum FormDataLoadState {
        InitialLoad = 1,
        Save = 2,
        Refresh = 3,
    }

    /**
     * Enumeration of entity form save modes.
     */
    const enum SaveMode {
        Save = 1,
        SaveAndClose = 2,
        SaveAndNew = 59,
        AutoSave = 70,
        SaveAsCompleted = 58,
        Deactivate = 5,
        Reactivate = 6,
        Assign = 47,
        Send = 7,
        Qualify = 16,
        Disqualify = 15,
    }

    /**
     * Enumeration of stage categories.
     */
    const enum StageCategory {
        Qualify = 0,
        Develop = 1,
        Propose = 2,
        Close = 3,
        Identify = 4,
        Research = 5,
        Resolve = 6,
    }

    /**
     * Enumeration of grid control context resolutions.
     */
    const enum GridControlContext {
        Unknown = 0,
        RibbonContextForm = 1,
        RibbonContextListing = 2,
        FormContextUnrelated = 3,
        FormContextRelated = 4,
    }

    /**
     * Enumeration of grid client type
     */
    const enum GridClient {
        Browser = 0,
        MobileApplication = 1,
    }

    /**
     * An enumeration for view types.
     */
    const enum ViewType {
        SystemView = 1039,
        UserView = 4230,
    }

    /**
     * An enumeration for Attribute Type metadata
     */
    const enum AttributeTypeCode {
        Boolean = 0,
        Customer = 1,
        DateTime = 2,
        Decimal = 3,
        Double = 4,
        Integer = 5,
        Lookup = 6,
        Memo = 7,
        Money = 8,
        Owner = 9,
        PartyList = 10,
        Picklist = 11,
        State = 12,
        Status = 13,
        String = 14,
        Uniqueidentifier = 15,
        CalendarRules = 16,
        Virtual = 17,
        BigInt = 18,
        ManagedProperty = 19,
        EntityName = 20,
    }

    /**
     * An enumeration for Attribute required level metadata
     */
    const enum AttributeRequiredLevel {
        None = 0,
        SystemRequired = 1,
        ApplicationRequired = 2,
        Recommended = 3,
    }

    /**
     * An enumeration for open file dialog options
     */
    const enum OpenFileOptions {
        Open = 1,
        Save = 2,
    }

    /**
     * An enumeration for window positions when opening a new window
     */
    const enum WindowPositions {
        Center = 1,
        Side = 2,
    }

    /**
     * An enumeration for Relationship Type Metadata
     */
    const enum RelationshipType {
        OneToMany = 0,
        ManyToMany = 1,
    }

    /**
     * An enumeration for Relationship Role Type Metadata
     */
    const enum RoleType {
        Referencing = 1,
        AssociationEntity = 2,
    }

    const enum ClientFormFactor {
        Unknown = 0,
        Desktop = 1,
        Tablet = 2,
        Phone = 3,
    }

    /**
     * Constant Enum: Client Types for {@link Xrm.ClientContext.getClient clientContext.getClient()}.
     * @see {@link Xrm.Client}
     */
    const enum Client {
        Web = "Web",
        Outlook = "Outlook",
        Mobile = "Mobile",
        UnifiedServiceDesk = "UnifiedServiceDesk",
        USD = "UnifiedServiceDesk",
    }

    /**
     * Constant Enum: Client States for {@link Xrm.ClientContext.getClientState clientContext.getClientState()}.
     * @see {@link Xrm.ClientState}
     */
    const enum ClientState {
        Online = "Online",
        Offline = "Offline",
    }

    /**
     * Constant Enum: Display States for setDisplayState() on {@link Xrm.Controls.ProcessControl.setDisplayState Processes} and {@link Xrm.Controls.Tab.setDisplayState Tabs}.
     * @see {@link Xrm.DisplayState}
     */
    const enum DisplayState {
        Expanded = "expanded",
        Collapsed = "collapsed",
    }

    /**
     * Constant Enum: {@link Xrm.Entity.save Entity} Save Modes
     * @see {@link Xrm.EntitySaveMode}
     * @see {@link Xrm.Entity}
     * @see {@link Xrm.Entity.save}
     */
    const enum EntitySaveMode {
        SaveAndClose = "saveandclose",
        SaveAndNew = "saveandnew",
    }

    /**
     * Constant Enum: Form Notification Levels for {@link Xrm.Ui.setFormNotification formContext.ui.setFormNotification()}.
     * @see {@link Xrm.FormNotificationLevel}
     */
    const enum FormNotificationLevel {
        Error = "ERROR",
        Info = "INFO",
        Warning = "WARNING",
    }

    /**
     * Constant Enum: App Notification Levels for {@link Xrm.App.addGlobalNotification Xrm.App.addGlobalNotification()}.
     * @see {@link Xrm.AppNotificationLevel}
     */
    const enum AppNotificationLevel {
        Success = 1,
        Error = 2,
        Warning = 3,
        Information = 4,
    }

    /**
     * Constant Enum: Submit Modes for {@link Xrm.Attributes.Attribute.setSubmitMode Attributes.Attribute.setSubmitMode()}.
     * @see {@link Xrm.SubmitMode}
     */
    const enum SubmitMode {
        Always = "always",
        Dirty = "dirty",
        Never = "never",
    }

    /**
     * Constant Enum: Themes for {@link Xrm.GlobalContext.getCurrentTheme globalContext.getCurrentTheme()}.
     * @remarks getCurrentTheme() does not work with Dynamics CRM for tablets or in the unified interface.
     */
    const enum Theme {
        Default = "default",
        Office12Blue = "Office12Blue",
        Office14Silver = "Office14Silver",
    }

    /**
     * Constant Enum: Settings for {@link Xrm.GlobalContext.getAdvancedConfigSetting globalContext.getAdvancedConfigSetting(setting)}
     */
    const enum AdvancedConfigSettingOption {
        MaxChildIncidentNumber = "MaxChildIncidentNumber",
        MaxIncidentMergeNumber = "MaxIncidentMergeNumber",
    }

    /**
     * Constant Enum: Requirement Level for {@link Xrm.Attributes.Attribute.getRequiredLevel Attributes.Attribute.getRequiredLevel()} and
     * {@link Xrm.Attributes.Attribute.setRequiredLevel Attributes.Attribute.setRequiredLevel()}.
     * @see {@link Xrm.Attributes.RequirementLevel}
     */
    const enum AttributeRequirementLevel {
        None = "none",
        Recommended = "recommended",
        Required = "required",
    }

    /**
     * Constant Enum: Date attribute formats for Attributes.Attribute.getFormat(), used by {@link Xrm.Attributes.DateAttribute DateAttribute}.
     * @see {@link Xrm.Attributes.DateAttributeFormat}
     */
    const enum DateAttributeFormat {
        Date = "date",
        DateTime = "datetime",
    }

    /**
     * Constant Enum: Integer attribute formats for Attributes.Attribute.getFormat(), used by {@link Xrm.Attributes.NumberAttribute NumberAttribute}.
     * @see {@link Xrm.Attributes.IntegerAttributeFormat}
     */
    const enum IntegerAttributeFormat {
        Duration = "duration",
        None = "none",
    }

    /**
     * Constant Enum: OptionSet attribute formats for Attributes.Attribute.getFormat(), used by {@link Xrm.Attributes.OptionSetAttribute OptionSetAttribute}.
     * @see {@link Xrm.Attributes.OptionSetAttributeFormat}
     */
    const enum OptionSetAttributeFormat {
        Language = "language",
        TimeZone = "timezone",
    }

    /**
     * Constant Enum: String attribute formats for Attributes.Attribute.getFormat(), used by {@link Xrm.Attributes.StringAttribute StringAttribute}.
     * @see {@link Xrm.Attributes.StringAttributeFormat}
     */
    const enum StringAttributeFormat {
        Email = "email",
        Phone = "phone",
        Text = "text",
        TextArea = "textarea",
        TickerSymbol = "tickersymbol",
        URL = "url",
    }

    /**
     * Constant Enum: Attribute types for {@link Xrm.Attributes.Attribute.getAttributeType getAttributeType()}.
     * @see {@link Xrm.Attributes.AttributeType}
     */
    const enum AttributeType {
        Boolean = "boolean",
        DateTime = "datetime",
        Decimal = "decimal",
        Double = "double",
        Integer = "integer",
        Lookup = "lookup",
        Memo = "memo",
        Money = "money",
        MultiOptionSet = "multiselectoptionset",
        OptionSet = "optionset",
        String = "string",
    }

    /**
     * Constant Enum: Control types for {@link Xrm.Controls.Control.getControlType Controls.Control.getControlType()}.
     * @see {@link Xrm.Controls.ControlType}
     */
    const enum StandardControlType {
        Standard = "standard",
        IFrame = "iframe",
        Lookup = "lookup",
        OptionSet = "optionset",
        MultiSelectOptionSet = "multiselectoptionset",
        SubGrid = "subgrid",
        WebResource = "webresource",
        Notes = "notes",
        TimerControl = "timercontrol",
        KBSearch = "kbsearch",
        TimeLineWall = "timelinewall",
        QuickForm = "quickform",
    }

    /**
     * Constant Enum: Direction types for a process stage change event
     * @see {@link Xrm.ProcessFlow.StageChangeDirection}
     */
    const enum StageChangeDirection {
        Next = "Next",
        Previous = "Previous",
    }

    /**
     * Constant Enum: Status for {@link Xrm.ProcessFlow.Stage.getStatus Stage.getStatus()}.
     * @see {@link Xrm.ProcessFlow.StageStatus}
     */
    const enum StageStatus {
        Active = "active",
        Inactive = "inactive",
    }

    /**
     * Constant Enum: Status for {@link Xrm.ProcessFlow.Process.getStatus Process.getStatus()}.
     * @see {@link Xrm.ProcessFlow.ProcessStatus}
     */
    const enum ProcessStatus {
        Active = "active",
        Aborted = "aborted",
        Finished = "finished",
    }

    /**
     * Constant Enum: Command Bar Display options for Xrm.Url.FormOpenParameters.cmdbar, Xrm.Url.ViewOpenParameters.cmdbar, and Xrm.Utility.FormOpenParameters.cmdbar.
     * @see {@link Xrm.Url.CmdBarDisplay}
     */
    const enum CmdBarDisplay {
        True = "true",
        False = "false",
    }

    /**
     * Constant Enum: Navigation Bar Display options for Xrm.Url.FormOpenParameters.navbar, Xrm.Url.ViewOpenParameters.navbar, and Xrm.Utility.FormOpenParameters.navbar.
     * @see {@link Xrm.Url.NavBarDisplay}
     */
    const enum NavBarDisplay {
        Entity = "entity",
        On = "on",
        Off = "off",
    }

    /**
     * Constant Enum: Report Open Action options for {@link Xrm.Url.ReportOpenParameters.action Xrm.Url.ReportOpenParameters.action}.
     * @see {@link Xrm.Url.ReportAction}
     */
    const enum ReportAction {
        Filter = "filter",
        Run = "run",
    }

    /**
     * Constant Enum: Possible file types for {@link Xrm.Device.pickFile Xrm.Device.pickFile()} options
     * @see {@link Xrm.Device.PickFileTypes}
     */
    const enum DevicePickFileType {
        Audio = "audio",
        Video = "video",
        Image = "image",
    }

    const enum OpenSearchResultMode {
        Inline = "Inline",
        Popup = "Popup",
    }
}
