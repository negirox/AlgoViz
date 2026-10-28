import { renderSocialImage, SOCIAL_IMAGE_ALT, SOCIAL_IMAGE_SIZE } from '@/lib/social-image';

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return renderSocialImage();
}
