import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { heightCm = 178, weightKg = 74, fitPreference = 'boxy', category = 'hoodies' } = body;

    // Body Mass Index approximation & proportional tailoring matrix
    const bmi = weightKg / Math.pow(heightCm / 100, 2);

    let recommendedSize = 'M';
    let confidence = 94;
    let chestCm = 114;
    let lengthCm = 71;
    let shoulderCm = 56;

    if (weightKg < 62 || (heightCm < 170 && bmi < 21)) {
      recommendedSize = fitPreference === 'oversized' ? 'M' : 'S';
      chestCm = 108;
      lengthCm = 68;
      shoulderCm = 53;
      confidence = 92;
    } else if (weightKg <= 75) {
      if (fitPreference === 'oversized') {
        recommendedSize = 'L';
        chestCm = 120;
        lengthCm = 74;
        shoulderCm = 58;
      } else {
        recommendedSize = 'M';
        chestCm = 114;
        lengthCm = 71;
        shoulderCm = 55;
      }
      confidence = 96;
    } else if (weightKg <= 88) {
      if (fitPreference === 'oversized') {
        recommendedSize = 'XL';
        chestCm = 126;
        lengthCm = 76;
        shoulderCm = 61;
      } else {
        recommendedSize = 'L';
        chestCm = 120;
        lengthCm = 73;
        shoulderCm = 58;
      }
      confidence = 95;
    } else {
      recommendedSize = fitPreference === 'boxy' ? 'XL' : 'XXL';
      chestCm = 132;
      lengthCm = 78;
      shoulderCm = 64;
      confidence = 91;
    }

    const fitNotes =
      fitPreference === 'oversized'
        ? `Size ${recommendedSize} will deliver the signature Q relaxed wide-leg drape with comfortable room throughout the leg.`
        : `Size ${recommendedSize} will provide a clean straight-cut silhouette with an easy drape at the sneakers.`;

    return NextResponse.json({
      success: true,
      recommendation: {
        recommendedSize,
        confidence,
        fitNotes,
        dimensions: {
          chestCm,
          lengthCm,
          shoulderCm,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid measurement parameters' },
      { status: 400 }
    );
  }
}
