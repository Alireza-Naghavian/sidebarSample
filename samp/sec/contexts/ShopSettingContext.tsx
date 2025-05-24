'use client';

import { ShopSettingTypes } from '@/_types/shopSetting';
import { SERVICE_API_SHOP_SETTING } from '@/services';
import { swrPostFetcher } from '@/utils/swrFetcher';
import { ReactNode, createContext, useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

// ----------------------------------------------------------------------

const initialState: ShopSettingTypes.InitialStateType = {
  itemsValues: {
    name: '',
    phone: '',
    mobile: '',
    avatarUrl: '',
    baleUrl: '',
    eitaaUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    robikaUrl: '',
    sorooshUrl: '',
    telegramUrl: '',
    whatsappUrl: '',
    shopAddress: '',
    shopEmail: '',
    shopGuild: '',
    shopName: '',
    shopBanner: '',
    shopLatlng: '',
  },
  products: [],
  handleSetItemsValues(values) {},
  handleSetProducts(product) {},
  handleSubmit() {},
  isMutatingSetting: false,
};

const ShopSettingContext = createContext(initialState);

type Props = {
  children: ReactNode;
};

function ShopSettingProvider({ children }: Props) {
  //swr
  const { trigger: mutateSetting, isMutating: isMutatingSetting } = useSWRMutation(
    SERVICE_API_SHOP_SETTING,
    swrPostFetcher<ShopSettingTypes.ShopSettingArgs, boolean>,
  );

  //states
  const [itemsValues, setItemsValues] = useState<ShopSettingTypes.ItemsValues>({
    ...initialState.itemsValues,
  });
  const [products, setProducts] = useState<ShopSettingTypes.Product[]>([...initialState.products]);

  //handlers
  const handleSetItemsValues = (values:ShopSettingTypes.ItemsValues) => {
    setItemsValues(values);
  };

  const handleSetProducts = (products:ShopSettingTypes.Product[]) => {
    setProducts(products);
  };

  const handleSubmit = () => {
    const handleMutate = async () => {
      const res = await mutateSetting({
        ...itemsValues,
        products: products,
      });

      if (res?.success) {
        //do stuff

        toast.success('ذخیره تغییرات موفقیت آمیز');
      } else {
        //do stuff

        toast.error('خطا در ذخیره تغییرات');
      }
    };
    handleMutate();
  };

  return (
    <ShopSettingContext
      value={{
        itemsValues,
        products,
        handleSetItemsValues,
        handleSetProducts,
        handleSubmit,
        isMutatingSetting,
      }}>
      {children}
    </ShopSettingContext>
  );
}

export { ShopSettingProvider, ShopSettingContext };
