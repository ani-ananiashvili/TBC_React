import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../utils/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });
    const supabase = await createClient();

    const { name, price, photo, brand, description } = body;

    // 1. Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: [photo],
    });

    // 2. Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price * 100,
      currency: 'usd',
    });

    // Get the user ID
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // 3. Create product in Supabase
    const { data, error } = await supabase
      .from('Furniture_Products')
      .insert({
        name,
        price,
        photo,
        brand,
        description,
        user_id: userId,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      })
      .single();

    if (error) {
      return NextResponse.json({ message: 'Failed to create product.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product successfully created!', data });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred while creating the product.' }, { status: 500 });
  }
}
