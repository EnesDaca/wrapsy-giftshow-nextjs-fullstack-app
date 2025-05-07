// scripts/update-images.js
import 'dotenv/config';            // 2. Load .env vars :contentReference[oaicite:8]{index=8}
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Missing STRIPE_SECRET_KEY in environment");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});                                 // 3. Provide API key :contentReference[oaicite:9]{index=9}

async function updateProductImages(productId, imageUrls) {
  // 8. Stripe API Update docs: pass full images array (max 8) :contentReference[oaicite:10]{index=10}
  const updated = await stripe.products.update(productId, { images: imageUrls });
  console.log(`✅ Updated ${updated.id} images:`, updated.images);
}

// Example usage

var PRODUCT_ID = 'prod_S8TrtFXue1p0h8';//folder
var images = [
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745439969/dfp968lhztvruzajxmst.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745439965/mzztcoqspafvshkuy9ni.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745439965/olpyu3j2kl8x8mf5p5bl.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745439965/rzxxeew2l8faup91uzv6.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745439965/fbd3s2hth4zsfjekcxxo.jpg',
  // 5 of...up to 8 URLs
];

var PRODUCT_ID = 'prod_S8Tou3Xd4JffyC';//mobius clock
var images = [
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441965/mexnrx1vzijwdjzbttdw.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745442372/nws6y3pahi6vmeq68a8x.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441964/y2oclzno5ffssvqct3rt.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441964/weiwxxyag9oqmiaeyywc.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745442177/jnvxnc9h9dmt91wanbej.jpg',
  // 4 of...up to 8 URLs
];

var PRODUCT_ID = 'prod_S8TqM9HFEswfA7';//marine knot lamp
var images = [
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441535/vu0xktthdmichrraah1x.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441535/w5fq6kxf4gr2ch8ehbtn.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441535/a3sub4iyup8aups0rpdr.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745441535/qnae85c76hxpchnleavm.jpg',
  // 5 of...up to 8 URLs
];

var PRODUCT_ID = 'prod_SAqPVTzFe15Njg';//mushroom
var images = [
    'https://res.cloudinary.com/dzxy80og2/image/upload/v1745430312/laldjkefqp54n5zdpyv9.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745430312/wr85ts2gnhksruhmxesj.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745430312/hrhlltkhayosvceqbqgp.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745430312/twtyvqiqc6jm2tndnq4x.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745430312/s5cje5y1p8q8oiyskhcj.jpg',
  'https://res.cloudinary.com/dzxy80og2/image/upload/v1745430312/faqhnmwvp5drr5njzq6o.jpg',
  // 6 of...up to 8 URLs
];
updateProductImages(PRODUCT_ID, images).catch((err) => {
  console.error("❌ Update failed:", err);
  process.exit(1);
});
