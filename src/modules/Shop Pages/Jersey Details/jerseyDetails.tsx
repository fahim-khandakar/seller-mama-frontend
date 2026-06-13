'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useGetSingleProductQuery } from '@/redux/features/dashboard/product';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hook';
import { IProduct } from '@/types/product.type';
import { addToCart } from '@/redux/features/slice/cart/cartSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import JerseyDetailsPageSkeleton from '@/components/common/Jersey Details Page Skeleton/JerseyDetailsPageSkeleton';
import Modal from '@/components/common/Modal/Modal';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function JerseyDetails() {
  const { slug } = useParams();
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { data: singleProduct, isLoading } = useGetSingleProductQuery(
    slug as string,
  );

  useEffect(() => {
    if (singleProduct?.data) {
      setMainImage(singleProduct?.data?.images[0]);
    }
  }, [singleProduct]);

  const dispatch = useAppDispatch();
  const handleAddToCart = (product: IProduct) => {
    if (customName || customNumber) {
      if (!customName || !customNumber) {
        toast.error('Please provide both name and number for customization');
        return;
      }
    }
    dispatch(
      addToCart({
        id: product._id as string,
        cartKey: `${product._id}-${selectedSize}-${customName}-${customNumber}`,
        name: product.name,
        price:
          (product.discountPrice ?? product.basePrice) +
          (customName && customNumber ? 250 : 0),
        image: product?.images?.[0] || '',
        quantity: 1,
        size: selectedSize,
        customizedName: customName || '',
        customizedNumber: customNumber || '',
      }),
    );
    toast.success(`${product?.name} Added to cart — ready for checkout`);
    router.push('/cart');
  };

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <JerseyDetailsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            {/* Big Main Image */}
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl">
              {singleProduct?.data?.images?.[0] && (
                <Image
                  src={mainImage || singleProduct.data.images[0]}
                  alt="Main Product Image"
                  fill
                  className="object-cover transition-all duration-500 ease-in-out"
                  priority
                />
              )}
              {/* <Badge className="absolute top-6 left-6 bg-orange-600 px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg">
                Best Sales
              </Badge> */}
            </div>

            {/* Clickable Thumbnails Grid */}
            <div className="grid grid-cols-4 gap-4">
              {singleProduct?.data?.images?.map((img: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)} // Click korle boro chhobi change hobe
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 transform active:scale-90 ${
                    mainImage === img
                      ? 'border-orange-500 ring-4 ring-orange-500/10 scale-95 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase leading-tight">
                {singleProduct?.data?.name} <br />
                <span className="text-orange-500 font-outline-2">
                  {singleProduct?.data?.category?.name}
                </span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  {/* <span className="ml-2 text-sm font-bold text-slate-500">
                    (120 Reviews)
                  </span> */}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-green-600 font-bold text-sm tracking-wide uppercase">
                  In Stock
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                ৳
                {singleProduct?.data?.discountPrice ||
                  singleProduct?.data?.basePrice}
              </span>
              {singleProduct?.data?.discountPrice && (
                <span className="text-xl text-slate-400 line-through">
                  ৳{singleProduct?.data?.basePrice}
                </span>
              )}
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/30"
              >
                Save ৳
                {singleProduct?.data?.basePrice -
                  singleProduct?.data?.discountPrice}
              </Badge>
            </div>

            <Separator />

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black uppercase tracking-widest text-sm">
                  Select Size
                </h3>
                <button
                  onClick={handleModalOpen}
                  className="text-xs font-bold text-orange-600 underline cursor-pointer"
                >
                  Size Chart
                </button>
              </div>
              <RadioGroup
                defaultValue="M"
                onValueChange={setSelectedSize}
                className="flex gap-4"
              >
                {sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={size}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={size}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-bold transition-all peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white hover:border-orange-500 cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Checkbox
                  id="cust"
                  onCheckedChange={(val) => setShowCustom(val as boolean)}
                />
                <Label
                  htmlFor="cust"
                  className="font-black uppercase text-xs cursor-pointer"
                >
                  Add Name & Number (+৳250)
                </Label>
              </div>
              {showCustom && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                  <Input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="NAME (e.g. MESSI)"
                    className="bg-white border-none font-black uppercase"
                  />
                  <Input
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    placeholder="NUMBER (e.g. 10)"
                    className="bg-white border-none font-black"
                  />
                </div>
              )}
            </div>

            {/* Quantity & Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border-2 border-slate-200 dark:border-slate-800 rounded-2xl h-14 px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={() => handleAddToCart(singleProduct?.data)}
                className="flex-1 h-14 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-600/20 gap-3"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              {/* <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-2xl border-slate-200"
              >
                <Heart className="w-5 h-5" />
              </Button> */}
            </div>

            {/* Delivery Trust Badges (Important for you!) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Truck className="w-5 h-5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase leading-tight">
                  Check on
                  <br />
                  Delivery
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase leading-tight">
                  Authentic
                  <br />
                  Imported Jersey
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase leading-tight">
                  Instant
                  <br />
                  Return
                </span>
              </div>
            </div>

            {/* Tabs for Details */}
            <div className="pt-8">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-transparent border-b rounded-none w-full justify-start gap-8 px-0 h-12">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 font-bold uppercase tracking-widest text-xs"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="material"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 font-bold uppercase tracking-widest text-xs"
                  >
                    Material
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="description"
                  className="py-6 text-slate-500 text-sm leading-relaxed"
                >
                  {singleProduct?.data?.details ||
                    'No description available for this product.'}
                </TabsContent>
                <TabsContent
                  value="material"
                  className="py-6 text-slate-500 text-sm"
                >
                  <ul className="list-disc pl-5 space-y-2">
                    {singleProduct?.data?.description?.map(
                      (desc: string, i: number) => (
                        <li key={i}>{desc}</li>
                      ),
                    )}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={`${singleProduct?.data?.category?.name} Size Chart`}
        description={
          '⚠️ Check Your Fit: To avoid fitting issues, please check our Size Chart carefully before confirming your order.'
        }
      >
        <div className="p-2">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            {singleProduct?.data?.category?.sizeChartImage ? (
              <Image
                src={singleProduct?.data?.category?.sizeChartImage}
                alt={`${singleProduct?.data?.category?.name} Size Guide`}
                fill
                className="object-contain p-2"
                sizes="(max-w-768px) 100vw, 600px"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold text-sm">
                No Size Chart Available
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
