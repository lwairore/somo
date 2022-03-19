import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormatUrlPipe } from './pipes/format-url.pipe';
import { DynamicallySetHeightUsingScrollHeightDirective } from './directives/dynamically-set-height-using-scroll-height.directive';
import { SanitizeValuePipe } from './pipes/sanitize-value.pipe';
import { DecodeEncodedUriStringPipe } from './pipes/decode-encoded-uri-string.pipe';
import { SphericalCoordinatesToDmsPipe } from './pipes/spherical-coordinates-to-dms.pipe';
import { SocialShareCtaComponent } from './social-share-cta/social-share-cta.component';
import { ShareModule } from 'ngx-sharebuttons';
import { WrapUrlInAnchorTagPipe } from './pipes/wrap-url-in-anchor-tag.pipe';
import { ExternalLinkDirective } from './directives/external-link.directive';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FormatUrlPipe,
    DynamicallySetHeightUsingScrollHeightDirective,
    SanitizeValuePipe,
    DecodeEncodedUriStringPipe,
    SphericalCoordinatesToDmsPipe,
    SocialShareCtaComponent,
    WrapUrlInAnchorTagPipe,
    ExternalLinkDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FormatUrlPipe,
    DynamicallySetHeightUsingScrollHeightDirective,
    SanitizeValuePipe,
    DecodeEncodedUriStringPipe,
    SphericalCoordinatesToDmsPipe,
    SocialShareCtaComponent,
    WrapUrlInAnchorTagPipe,
    ExternalLinkDirective,
  ]
})
export class SharedModule { }
