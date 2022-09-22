'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-typescript documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' : 'data-target="#xs-controllers-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' :
                                            'id="xs-controllers-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' : 'data-target="#xs-injectables-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' :
                                        'id="xs-injectables-links-module-AuthModule-38b8021d71ad46609979e904d78caf68047ea7d8724ab0e9cb12a46a279f3bb0ae03ff21436062342a6b81ee8ff81e488108e0b3be44a5158af848013caac948"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtTwoFactorStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' : 'data-target="#xs-controllers-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' :
                                            'id="xs-controllers-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' : 'data-target="#xs-injectables-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' :
                                        'id="xs-injectables-links-module-CategoriesModule-f4d8f0d310c753b76da204cea2a0ce5cfdd1a11794909c3de752c8fbc615afb171f518e8bba86d6899988101ec00a6f987e084c4b1aad1dd42af7edf6ef53ea0"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChatModule-7fed0bdda7b52238ea8b758bb9697f26c8180a50fe221c81c5160bd17aa16a94982e2c84dc782713ee00725ab87d69db7f3aa1e39fd836527f4ba16c0b373a7b"' : 'data-target="#xs-injectables-links-module-ChatModule-7fed0bdda7b52238ea8b758bb9697f26c8180a50fe221c81c5160bd17aa16a94982e2c84dc782713ee00725ab87d69db7f3aa1e39fd836527f4ba16c0b373a7b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-7fed0bdda7b52238ea8b758bb9697f26c8180a50fe221c81c5160bd17aa16a94982e2c84dc782713ee00725ab87d69db7f3aa1e39fd836527f4ba16c0b373a7b"' :
                                        'id="xs-injectables-links-module-ChatModule-7fed0bdda7b52238ea8b758bb9697f26c8180a50fe221c81c5160bd17aa16a94982e2c84dc782713ee00725ab87d69db7f3aa1e39fd836527f4ba16c0b373a7b"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentsModule-9f3e919a5e45f9b25c601d74af2910eb39e85fce71e0fd5f80377d7491ed0edbb57bda0e511d920976961bff1af59e8df3993b9f0b3d39dfbf76cd3c17ee3aa6"' : 'data-target="#xs-controllers-links-module-CommentsModule-9f3e919a5e45f9b25c601d74af2910eb39e85fce71e0fd5f80377d7491ed0edbb57bda0e511d920976961bff1af59e8df3993b9f0b3d39dfbf76cd3c17ee3aa6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-9f3e919a5e45f9b25c601d74af2910eb39e85fce71e0fd5f80377d7491ed0edbb57bda0e511d920976961bff1af59e8df3993b9f0b3d39dfbf76cd3c17ee3aa6"' :
                                            'id="xs-controllers-links-module-CommentsModule-9f3e919a5e45f9b25c601d74af2910eb39e85fce71e0fd5f80377d7491ed0edbb57bda0e511d920976961bff1af59e8df3993b9f0b3d39dfbf76cd3c17ee3aa6"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailConfirmationModule.html" data-type="entity-link" >EmailConfirmationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' : 'data-target="#xs-controllers-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' :
                                            'id="xs-controllers-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' }>
                                            <li class="link">
                                                <a href="controllers/EmailConfirmationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' : 'data-target="#xs-injectables-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' :
                                        'id="xs-injectables-links-module-EmailConfirmationModule-737ad7f0c05bf576f4b05c6e21760b5e861c03f59051b581d61f5261379ce669311b9ff241cf21d95ba8065dcd2f4c0693ef811c72cd68f4afa1cc463522ef32"' }>
                                        <li class="link">
                                            <a href="injectables/EmailConfirmationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-b2520c680722794a5ab3cecad40b54cbac62814044c6e0f857a3e60f19b78b959c976fc61f121f40e3ef9bc95a9a870596b18a33c677831966d9bcd3a443ac89"' : 'data-target="#xs-injectables-links-module-EmailModule-b2520c680722794a5ab3cecad40b54cbac62814044c6e0f857a3e60f19b78b959c976fc61f121f40e3ef9bc95a9a870596b18a33c677831966d9bcd3a443ac89"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-b2520c680722794a5ab3cecad40b54cbac62814044c6e0f857a3e60f19b78b959c976fc61f121f40e3ef9bc95a9a870596b18a33c677831966d9bcd3a443ac89"' :
                                        'id="xs-injectables-links-module-EmailModule-b2520c680722794a5ab3cecad40b54cbac62814044c6e0f857a3e60f19b78b959c976fc61f121f40e3ef9bc95a9a870596b18a33c677831966d9bcd3a443ac89"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailSchedulingModule.html" data-type="entity-link" >EmailSchedulingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' : 'data-target="#xs-controllers-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' :
                                            'id="xs-controllers-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' }>
                                            <li class="link">
                                                <a href="controllers/EmailSchedulingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSchedulingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' : 'data-target="#xs-injectables-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' :
                                        'id="xs-injectables-links-module-EmailSchedulingModule-4eb4d4711ef5d0879af2880973ac5a249ae914a30dd6ec2edb90ac1946527ff41008c349b4b9ea80526c6a6321ce49474667a65c3368cbba8cb1011bda901092"' }>
                                        <li class="link">
                                            <a href="injectables/EmailSchedulingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSchedulingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OptimizeModule.html" data-type="entity-link" >OptimizeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OptimizeModule-1be6b66c7e1e44cc84edc0ce1362aad21e0766b910c1357c705d829748d516fb9be7796953645633d427b72f1cf5e5c1f2c6a7f807df906b9b911ce3ebce19f2"' : 'data-target="#xs-controllers-links-module-OptimizeModule-1be6b66c7e1e44cc84edc0ce1362aad21e0766b910c1357c705d829748d516fb9be7796953645633d427b72f1cf5e5c1f2c6a7f807df906b9b911ce3ebce19f2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OptimizeModule-1be6b66c7e1e44cc84edc0ce1362aad21e0766b910c1357c705d829748d516fb9be7796953645633d427b72f1cf5e5c1f2c6a7f807df906b9b911ce3ebce19f2"' :
                                            'id="xs-controllers-links-module-OptimizeModule-1be6b66c7e1e44cc84edc0ce1362aad21e0766b910c1357c705d829748d516fb9be7796953645633d427b72f1cf5e5c1f2c6a7f807df906b9b911ce3ebce19f2"' }>
                                            <li class="link">
                                                <a href="controllers/OptimizeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OptimizeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' : 'data-target="#xs-controllers-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' :
                                            'id="xs-controllers-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' : 'data-target="#xs-injectables-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' :
                                        'id="xs-injectables-links-module-PostsModule-ad852b32708687d7c891524609d1af3a3d5ab48472f36c461f6dad975adaedf2a8b898d5c37c76107a0fb40c886856b2b1d998107f12f12ddb2a1b94fb84c559"' }>
                                        <li class="link">
                                            <a href="injectables/PostsSearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsSearchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivateFilesModule.html" data-type="entity-link" >PrivateFilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrivateFilesModule-5c0bf7f1902bdd6a64b654fe7064167e067640da067bd96535d01813c3764dc4ad181abee000c553a3b07ea40ab59dff623b681d37b18cc541c695198f6cd038"' : 'data-target="#xs-injectables-links-module-PrivateFilesModule-5c0bf7f1902bdd6a64b654fe7064167e067640da067bd96535d01813c3764dc4ad181abee000c553a3b07ea40ab59dff623b681d37b18cc541c695198f6cd038"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrivateFilesModule-5c0bf7f1902bdd6a64b654fe7064167e067640da067bd96535d01813c3764dc4ad181abee000c553a3b07ea40ab59dff623b681d37b18cc541c695198f6cd038"' :
                                        'id="xs-injectables-links-module-PrivateFilesModule-5c0bf7f1902bdd6a64b654fe7064167e067640da067bd96535d01813c3764dc4ad181abee000c553a3b07ea40ab59dff623b681d37b18cc541c695198f6cd038"' }>
                                        <li class="link">
                                            <a href="injectables/PrivateFilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivateFilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicFilesModule.html" data-type="entity-link" >PublicFilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PublicFilesModule-3e79ac1d2f094affb9ba1f150d2f17b152265ecc0ad0cbbc56bd8ba98d33b15651ad9d4bfe5ea75d030ba48006b4bc90bb347a43f93b3cc95bfa997e76876691"' : 'data-target="#xs-injectables-links-module-PublicFilesModule-3e79ac1d2f094affb9ba1f150d2f17b152265ecc0ad0cbbc56bd8ba98d33b15651ad9d4bfe5ea75d030ba48006b4bc90bb347a43f93b3cc95bfa997e76876691"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PublicFilesModule-3e79ac1d2f094affb9ba1f150d2f17b152265ecc0ad0cbbc56bd8ba98d33b15651ad9d4bfe5ea75d030ba48006b4bc90bb347a43f93b3cc95bfa997e76876691"' :
                                        'id="xs-injectables-links-module-PublicFilesModule-3e79ac1d2f094affb9ba1f150d2f17b152265ecc0ad0cbbc56bd8ba98d33b15651ad9d4bfe5ea75d030ba48006b4bc90bb347a43f93b3cc95bfa997e76876691"' }>
                                        <li class="link">
                                            <a href="injectables/PublicFilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublicFilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SmsModule.html" data-type="entity-link" >SmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' : 'data-target="#xs-controllers-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' :
                                            'id="xs-controllers-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' }>
                                            <li class="link">
                                                <a href="controllers/SmsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' : 'data-target="#xs-injectables-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' :
                                        'id="xs-injectables-links-module-SmsModule-506f05ccbec128f76a86fbb867eb7ce12565d60f966f35e5710db3c0288b6ca434c63b24ef65ef8fb60b693edf2ebfef174c56bfe85ef6dfd51e3cced45b7b45"' }>
                                        <li class="link">
                                            <a href="injectables/SmsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SubscribersModule-18c35134ad976c8908c7ec3ae024d908a0b76f385942cbcbd5b9da7c72bdba77a93e818521030bce1039395ff28056b612b9218ea10bc0def0c3d3497fd245bd"' : 'data-target="#xs-controllers-links-module-SubscribersModule-18c35134ad976c8908c7ec3ae024d908a0b76f385942cbcbd5b9da7c72bdba77a93e818521030bce1039395ff28056b612b9218ea10bc0def0c3d3497fd245bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-18c35134ad976c8908c7ec3ae024d908a0b76f385942cbcbd5b9da7c72bdba77a93e818521030bce1039395ff28056b612b9218ea10bc0def0c3d3497fd245bd"' :
                                            'id="xs-controllers-links-module-SubscribersModule-18c35134ad976c8908c7ec3ae024d908a0b76f385942cbcbd5b9da7c72bdba77a93e818521030bce1039395ff28056b612b9218ea10bc0def0c3d3497fd245bd"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TwoFactorAuthModule.html" data-type="entity-link" >TwoFactorAuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' : 'data-target="#xs-controllers-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' :
                                            'id="xs-controllers-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' }>
                                            <li class="link">
                                                <a href="controllers/TwoFactorAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' : 'data-target="#xs-injectables-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' :
                                        'id="xs-injectables-links-module-TwoFactorAuthModule-487cb883205ed50a101c936f2e2175cfc047756d8b569b38503aee5c66b174d066d0c323d78446359b97c239def53f035d46c48c2d279b318cb7770b42e01b82"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwoFactorAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' : 'data-target="#xs-controllers-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' :
                                            'id="xs-controllers-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' : 'data-target="#xs-injectables-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' :
                                        'id="xs-injectables-links-module-UsersModule-2d0c7f5547b3f441326f278ee0950ee1512985b4671fba26e942f7085518a2b24d46e00796fbf9fe2a16b86233e259fccea3a005126d30d08e0b7052f90b6010"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Address.html" data-type="entity-link" >Address</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Comment.html" data-type="entity-link" >Comment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Message.html" data-type="entity-link" >Message</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PrivateFile.html" data-type="entity-link" >PrivateFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PublicFile.html" data-type="entity-link" >PublicFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryNotFoundException.html" data-type="entity-link" >CategoryNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckVerificationCodeDto.html" data-type="entity-link" >CheckVerificationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmEmailDto.html" data-type="entity-link" >ConfirmEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentCommand.html" data-type="entity-link" >CreateCommentCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentHandler.html" data-type="entity-link" >CreateCommentHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostInput.html" data-type="entity-link" >CreatePostInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailScheduleDto.html" data-type="entity-link" >EmailScheduleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionLoggerFilter.html" data-type="entity-link" >ExceptionLoggerFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneParams.html" data-type="entity-link" >FindOneParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsDto.html" data-type="entity-link" >GetCommentsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsHandler.html" data-type="entity-link" >GetCommentsHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCommentsQuery.html" data-type="entity-link" >GetCommentsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageProcessor.html" data-type="entity-link" >ImageProcessor</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectWithIdDto.html" data-type="entity-link" >ObjectWithIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostNotFoundException.html" data-type="entity-link" >PostNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostsResolver.html" data-type="entity-link" >PostsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistrationDto.html" data-type="entity-link" >RegistrationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendMessageDto.html" data-type="entity-link" >SendMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwoFactorAuthCodeDto.html" data-type="entity-link" >TwoFactorAuthCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GraphqlJwtGuard.html" data-type="entity-link" >GraphqlJwtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorGuard.html" data-type="entity-link" >JwtTwoFactorGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalGuard.html" data-type="entity-link" >LocalGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsMiddleware.html" data-type="entity-link" >LogsMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsSearchService.html" data-type="entity-link" >PostsSearchService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/EmailConfirmationGuard.html" data-type="entity-link" >EmailConfirmationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostSearchBody.html" data-type="entity-link" >PostSearchBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostSearchResult.html" data-type="entity-link" >PostSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestUser.html" data-type="entity-link" >RequestUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerificationTokenPayload.html" data-type="entity-link" >VerificationTokenPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});