import cv2

img = cv2.imread('public/logo.png', cv2.IMREAD_GRAYSCALE)
h, w = img.shape
_, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_L1)

cnt = max(contours, key=cv2.contourArea)
epsilon = 0.00035 * cv2.arcLength(cnt, True)
approx = cv2.approxPolyDP(cnt, epsilon, True)

path_d = 'M ' + ' L '.join(f'{pt[0][0]} {pt[0][1]}' for pt in approx) + ' Z'
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="currentColor">
  <path d="{path_d}" />
</svg>'''

with open('public/logo.svg', 'w') as f:
    f.write(svg_content)

print(f"Saved smooth logo.svg with {len(approx)} points!")
