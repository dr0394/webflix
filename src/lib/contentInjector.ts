interface ChecklistData {
  companyInfo?: {
    name?: string;
    tagline?: string;
    description?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    zip?: string;
    openingHours?: string;
  };
  services?: Array<{
    id: string;
    name: string;
    description?: string;
    price?: string;
  }>;
  vehicleTypes?: string[];
  images?: {
    logo?: string;
    hero?: string;
    gallery?: string[];
  };
  colors?: {
    primary?: string;
    secondary?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  additionalInfo?: {
    [key: string]: any;
  };
}

export class ContentInjector {
  private checklistData: ChecklistData;
  private templateName: string;

  constructor(checklistData: ChecklistData, templateName: string) {
    this.checklistData = checklistData;
    this.templateName = templateName;
  }

  public injectContent(componentCode: string): string {
    let injectedCode = componentCode;

    injectedCode = this.replaceCompanyInfo(injectedCode);
    injectedCode = this.replaceServices(injectedCode);
    injectedCode = this.replaceContactInfo(injectedCode);
    injectedCode = this.replaceImages(injectedCode);
    injectedCode = this.replaceColors(injectedCode);
    injectedCode = this.replaceSocialMedia(injectedCode);

    return injectedCode;
  }

  private replaceCompanyInfo(code: string): string {
    const { companyInfo } = this.checklistData;
    if (!companyInfo) return code;

    const replacements: Record<string, string> = {
      'Premium Autoaufbereitung': companyInfo.name || 'Premium Autoaufbereitung',
      'Perfektion bis ins kleinste Detail': companyInfo.tagline || 'Perfektion bis ins kleinste Detail',
      'Ihr Auto verdient das Beste': companyInfo.tagline || 'Ihr Auto verdient das Beste',
    };

    let result = code;
    for (const [search, replace] of Object.entries(replacements)) {
      result = result.replace(new RegExp(search, 'g'), replace);
    }

    return result;
  }

  private replaceServices(code: string): string {
    const { services } = this.checklistData;
    if (!services || services.length === 0) return code;

    return code;
  }

  private replaceContactInfo(code: string): string {
    const { companyInfo } = this.checklistData;
    if (!companyInfo) return code;

    const replacements: Record<string, string> = {};

    if (companyInfo.phone) {
      replacements['+49 123 456789'] = companyInfo.phone;
      replacements['0123 456789'] = companyInfo.phone;
    }

    if (companyInfo.email) {
      replacements['info@autoaufbereitung.de'] = companyInfo.email;
      replacements['kontakt@'] = companyInfo.email.split('@')[0] + '@';
    }

    if (companyInfo.address) {
      replacements['Musterstraße 123'] = companyInfo.address;
    }

    if (companyInfo.city && companyInfo.zip) {
      replacements['12345 Musterstadt'] = `${companyInfo.zip} ${companyInfo.city}`;
    }

    let result = code;
    for (const [search, replace] of Object.entries(replacements)) {
      result = result.replace(new RegExp(search, 'g'), replace);
    }

    return result;
  }

  private replaceImages(code: string): string {
    const { images } = this.checklistData;
    if (!images) return code;

    let result = code;

    if (images.logo) {
      result = result.replace(/src="[^"]*logo[^"]*"/g, `src="${images.logo}"`);
    }

    if (images.hero) {
      result = result.replace(/hero-image[^"]*\.jpg/g, images.hero);
    }

    return result;
  }

  private replaceColors(code: string): string {
    const { colors } = this.checklistData;
    if (!colors) return code;

    let result = code;

    if (colors.primary) {
      result = result.replace(/from-blue-600/g, `from-[${colors.primary}]`);
      result = result.replace(/to-cyan-600/g, `to-[${colors.primary}]`);
      result = result.replace(/bg-blue-600/g, `bg-[${colors.primary}]`);
      result = result.replace(/text-blue-600/g, `text-[${colors.primary}]`);
    }

    return result;
  }

  private replaceSocialMedia(code: string): string {
    const { socialMedia } = this.checklistData;
    if (!socialMedia) return code;

    let result = code;

    if (socialMedia.facebook) {
      result = result.replace(/href="https:\/\/facebook\.com\/[^"]*"/g, `href="${socialMedia.facebook}"`);
    }

    if (socialMedia.instagram) {
      result = result.replace(/href="https:\/\/instagram\.com\/[^"]*"/g, `href="${socialMedia.instagram}"`);
    }

    return result;
  }

  public static generateSlug(orderNumber: string, templateName: string): string {
    const cleanOrder = orderNumber.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTemplate = templateName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanOrder}-${cleanTemplate}`;
  }

  public static extractChecklistData(checklistRecord: any): ChecklistData {
    const data = checklistRecord.checklist_data || {};

    return {
      companyInfo: {
        name: data.companyName || data.businessName,
        tagline: data.tagline || data.slogan,
        description: data.description || data.aboutUs,
        phone: data.phone || data.phoneNumber,
        email: data.email || data.contactEmail,
        address: data.address || data.street,
        city: data.city,
        zip: data.postalCode || data.zip,
        openingHours: data.openingHours,
      },
      services: data.services || [],
      vehicleTypes: data.vehicleTypes || [],
      images: {
        logo: data.logo || data.logoUrl,
        hero: data.heroImage,
        gallery: data.galleryImages || [],
      },
      colors: {
        primary: data.primaryColor,
        secondary: data.secondaryColor,
      },
      socialMedia: {
        facebook: data.facebook || data.facebookUrl,
        instagram: data.instagram || data.instagramUrl,
        linkedin: data.linkedin || data.linkedinUrl,
      },
      additionalInfo: data.additionalInfo || {},
    };
  }
}
