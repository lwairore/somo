(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{lhKH:function(e,t,a){"use strict";a.r(t),a.d(t,"ContactUsModule",(function(){return S}));var r=a("ofXK"),i=a("tyNb"),o=a("Mpt7"),c=a("fXoL");function n(e,t){if(1&e&&(c.Qb(0,"li",6),c.rc(1),c.Pb()),2&e){const e=t.$implicit;c.Db("active",e.get("isActive")),c.zb(1),c.tc(" ",e.get("textContent")," ")}}function s(e,t){if(1&e&&(c.Qb(0,"nav",1),c.Qb(1,"div",2),c.Qb(2,"div",3),c.Qb(3,"div",4),c.Qb(4,"ol",5),c.Qb(5,"li",6),c.Qb(6,"a",7),c.rc(7,"Home"),c.Pb(),c.Pb(),c.pc(8,n,2,3,"li",8),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb()),2&e){const e=c.ac();c.zb(8),c.ec("ngForOf",e.breadcrumbItems)}}let m=(()=>{class e{constructor(e){this._changeDetectorRef=e,this.breadcrumbItems=o.a([])}ngOnInit(){}manuallyTriggerChangeDetection(){this._changeDetectorRef.detectChanges()}}return e.\u0275fac=function(t){return new(t||e)(c.Lb(c.h))},e.\u0275cmp=c.Fb({type:e,selectors:[["app-breadcrumb"]],decls:1,vars:1,consts:[["class","py-5",4,"ngIf"],[1,"py-5"],[1,"container"],[1,"row"],[1,"col-12"],[1,"breadcrumb","mb-0","font-size-xs","text-gray-400"],[1,"breadcrumb-item"],["routerLink","/",1,"text-gray-400"],["class","breadcrumb-item",3,"active",4,"ngFor","ngForOf"]],template:function(e,t){1&e&&c.pc(0,s,9,1,"nav",0),2&e&&c.ec("ngIf",!t.breadcrumbItems.isEmpty())},directives:[r.j,i.e,r.i],encapsulation:2,changeDetection:0}),e})();var p=a("jhN1");let g=(()=>{class e{constructor(e,t,a){this.metaService=e,this.titleService=t,this.document=a}setData(e){this.setSection(e.section),this.setKeywords(e.keywords),this.setTitle(e.title),this.setType(e.type),this.setDescription(e.description),this.setImage(e.image,e.imageAuxData),this.setUrl(e.url),this.setPublished(e.published),this.setModified(e.modified),this.setAuthor(e.author)}setKeywords(e){Boolean(e)?this.metaService.updateTag({name:"keywords",content:e}):this.metaService.removeTag("name='keywords'")}setSection(e){Boolean(e)?this.metaService.updateTag({name:"article:section",content:e}):this.metaService.removeTag("name='article:section'")}setTitle(e=""){this.titleService.setTitle(e),e&&e.length?(this.metaService.updateTag({name:"twitter:title",content:e}),this.metaService.updateTag({name:"twitter:image:alt",content:e}),this.metaService.updateTag({property:"og:image:alt",content:e}),this.metaService.updateTag({property:"og:title",content:e}),this.metaService.updateTag({name:"title",content:e}),this.metaService.updateTag({itemprop:"name",content:e},"itemprop='name'")):(this.metaService.removeTag("name='twitter:title'"),this.metaService.removeTag("name='twitter:image:alt'"),this.metaService.removeTag("property='og:image:alt'"),this.metaService.removeTag("property='og:title'"),this.metaService.removeTag("name='title'"),this.metaService.removeTag("itemprop='name'"))}setType(e){e&&e.length?this.metaService.updateTag({property:"og:type",content:e}):this.metaService.removeTag("property='og:type'")}setDescription(e){e&&e.length?(this.metaService.updateTag({name:"twitter:description",content:e}),this.metaService.updateTag({property:"og:description",content:e}),this.metaService.updateTag({name:"description",content:e}),this.metaService.updateTag({itemprop:"description",content:e},"itemprop='description'")):(this.metaService.removeTag("name='twitter:description'"),this.metaService.removeTag("property='og:description'"),this.metaService.removeTag("name='description'"),this.metaService.removeTag("itemprop='description'"))}setImage(e,t){e&&e.length?(this.metaService.updateTag({name:"twitter:image",content:e}),this.metaService.updateTag({itemprop:"image",content:e},"itemprop='image'"),this.metaService.updateTag({property:"og:image",content:e}),t&&t.height?this.metaService.updateTag({property:"og:image:height",content:t.height.toString()}):this.metaService.removeTag("property='og:image:height'"),t&&t.width?this.metaService.updateTag({property:"og:image:width",content:t.width.toString()}):this.metaService.removeTag("property='og:image:width'"),t&&t.alt?(this.metaService.updateTag({property:"og:image:alt",content:t.alt}),this.metaService.updateTag({property:"twitter:image:alt",content:t.alt})):(this.metaService.removeTag("property='og:image:alt'"),this.metaService.removeTag("property='twitter:image:alt'")),t&&t.mimeType?this.metaService.updateTag({property:"og:image:type",content:t.mimeType}):this.metaService.removeTag("property='og:image:type'"),t&&t.secureUrl?this.metaService.updateTag({property:"og:image:secure_url",content:t.secureUrl}):this.metaService.removeTag("property='og:image:secure_url'")):(this.metaService.removeTag("name='twitter:image'"),this.metaService.removeTag("property='twitter:image:alt'"),this.metaService.removeTag("property='og:image'"),this.metaService.removeTag("property='og:image:height'"),this.metaService.removeTag("property='og:image:secure_url'"),this.metaService.removeTag("property='og:image:type'"),this.metaService.removeTag("property='og:image:alt'"),this.metaService.removeTag("property='og:image:width'"),this.metaService.removeTag("itemprop='image'"))}setUrl(e){e&&e.length?this.metaService.updateTag({property:"og:url",content:e}):this.metaService.removeTag("property='og:url'"),this.setCanonicalUrl(e)}setPublished(e){if(e){const t=new Date(e);this.metaService.updateTag({name:"article:published_time",content:t.toISOString()}),this.metaService.updateTag({name:"published_date",content:t.toISOString()})}else this.metaService.removeTag("name='article:published_time'"),this.metaService.removeTag("name='publication_date'")}setModified(e){if(e){const t=new Date(e);this.metaService.updateTag({name:"article:modified_time",content:t.toISOString()}),this.metaService.updateTag({name:"og:updated_time",content:t.toISOString()})}else this.metaService.removeTag("name='article:modified_time'"),this.metaService.removeTag("name='og:updated_time'")}setAuthor(e){e&&e.length?(this.metaService.updateTag({name:"article:author",content:e}),this.metaService.updateTag({name:"author",content:e})):(this.metaService.removeTag("name='article:author'"),this.metaService.removeTag("name='author'"))}setTwitterSiteCreator(e){Boolean(e)?(this.metaService.updateTag({name:"twitter:site",content:e}),this.metaService.updateTag({name:"twitter:creator",content:e})):(this.metaService.removeTag("name='twitter:site'"),this.metaService.removeTag("name='twitter:creator'"))}setTwitterCard(e){Boolean(e)?this.metaService.updateTag({name:"twitter:card",content:e}):this.metaService.removeTag("name='twitter:card'")}setFbAppId(e){Boolean(e)?this.metaService.updateTag({property:"fb:app_id",content:e}):this.metaService.removeTag("property='fb:app_id'")}setMetaTag(e){Boolean(e.value)?this.metaService.updateTag({[e.attr]:e.attrValue,content:e.value}):this.metaService.removeTag(`${e.attr}='${e.attrValue}'`)}setMetaTags(e){for(const t of e)this.setMetaTag(t)}setLanguageAlternativeUrl(e,t){const a=this.document.head.querySelector(`link[rel='alternate'][hreflang='${e}']`);if(a&&this.document.head.removeChild(a),t&&t.length){const a=this.document.createElement("link");a.setAttribute("rel","alternate"),a.setAttribute("hreflang",e),a.setAttribute("href",t),this.document.head.appendChild(a)}}setCanonicalUrl(e){const t=this.document.head.querySelector("link[rel='canonical']");if(t&&this.document.head.removeChild(t),e&&e.length){const t=this.document.createElement("link");t.setAttribute("rel","canonical"),t.setAttribute("href",e),this.document.head.appendChild(t)}}}return e.\u0275fac=function(t){return new(t||e)(c.Ub(p.c),c.Ub(p.d),c.Ub(r.c))},e.\u0275prov=Object(c.Hb)({factory:function(){return new e(Object(c.Ub)(p.c),Object(c.Ub)(p.d),Object(c.Ub)(r.c))},token:e,providedIn:"root"}),e})();var h=a("EtQq"),v=a("aNQE"),b=a("jQpT");const u=[{path:"",component:(()=>{class e{constructor(e){this._seoSocialShareService=e}ngOnInit(){}ngAfterViewInit(){this._setupBreadcrumbDetails(),this._setupSEODetails()}_setupSEODetails(){this._seoSocialShareService.setData({title:"Contact Us | Somo",description:"Have a question?  Contact us 24 hours a day 7 days a week for the best customer service!",keywords:"customer service, technical assistance"})}_setupBreadcrumbDetails(){this._breadcrumbCmp instanceof m&&(this._breadcrumbCmp.breadcrumbItems=o.a([{textContent:"Contact Us",isActive:!0}]),this._breadcrumbCmp.breadcrumbItems.isEmpty()||this._breadcrumbCmp.manuallyTriggerChangeDetection())}}return e.\u0275fac=function(t){return new(t||e)(c.Lb(g))},e.\u0275cmp=c.Fb({type:e,selectors:[["app-contact-us"]],viewQuery:function(e,t){var a;1&e&&c.uc(m,!0),2&e&&c.ic(a=c.Zb())&&(t._breadcrumbCmp=a.first)},decls:41,vars:0,consts:[[1,"pt-7","pb-12"],[1,"container","text-center","d-flex","align-items-center","justify-content-center"],[1,"row"],[1,"col-12"],[1,"mb-10","text-center"],[1,""],[1,"mb-6"],[1,"fe","fe-phone","text-primary","mr-4"],[1,"text-gray-500"],["href","tel:254745520876",1,"text-gray-500"],[1,"mb-0"],["href","mailto:kwairore@gmail.com",1,"text-gray-500"]],template:function(e,t){1&e&&(c.Mb(0,"app-navbar"),c.Mb(1,"app-breadcrumb"),c.Qb(2,"section",0),c.Qb(3,"div",1),c.Qb(4,"div",2),c.Qb(5,"div",3),c.Qb(6,"h3",4),c.rc(7,"Contact Us"),c.Pb(),c.Qb(8,"div",5),c.Qb(9,"h6",6),c.Mb(10,"i",7),c.rc(11," Call to Us: "),c.Pb(),c.Qb(12,"p",8),c.rc(13," We're available from 10 am - 10 pm EST, 7 days a week. "),c.Pb(),c.Qb(14,"p"),c.Qb(15,"strong"),c.rc(16,"Customer Service:"),c.Pb(),c.Mb(17,"br"),c.Qb(18,"a",9),c.rc(19,"2547 45520876"),c.Pb(),c.Pb(),c.Qb(20,"p",10),c.Qb(21,"strong"),c.rc(22,"Careers:"),c.Pb(),c.Mb(23,"br"),c.Qb(24,"a",9),c.rc(25,"2547 45520876"),c.Pb(),c.Pb(),c.Mb(26,"hr"),c.Qb(27,"p"),c.Qb(28,"strong"),c.rc(29,"Customer Service:"),c.Pb(),c.Mb(30,"br"),c.Qb(31,"a",11),c.rc(32,"kwairore@gmail.com"),c.Pb(),c.Pb(),c.Qb(33,"p",10),c.Qb(34,"strong"),c.rc(35,"Careers:"),c.Pb(),c.Mb(36,"br"),c.Qb(37,"a",11),c.rc(38,"kwairore@gmail.com"),c.Pb(),c.Pb(),c.Mb(39,"hr"),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Pb(),c.Mb(40,"app-footer"))},directives:[h.a,m,v.a,b.a],encapsulation:2}),e})()}];let d=(()=>{class e{}return e.\u0275mod=c.Jb({type:e}),e.\u0275inj=c.Ib({factory:function(t){return new(t||e)},imports:[[i.f.forChild(u)],i.f]}),e})();var l=a("PCNd");let S=(()=>{class e{}return e.\u0275mod=c.Jb({type:e}),e.\u0275inj=c.Ib({factory:function(t){return new(t||e)},imports:[[r.b,d,l.a]]}),e})()}}]);