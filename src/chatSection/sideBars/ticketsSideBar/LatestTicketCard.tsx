import MuiLink from '@/components/links/MuiLink';
import { Typography } from '@mui/material';
import React from 'react';

function LatestTicketCard() {
  return (
    <MuiLink
      href=""
      className="w-full rounded-lg bg-common-white p-4 will-change-transform
                flex flex-col gap-y-2 shadow-sm transition-[transform,box-shadow]
                duration-700   [transform:translate3d(0,0,0)] [backface-visibility:hidden]
                hover:scale-[1.03] hover:shadow-2xl"
    >
      <div className="w-full flex items-center justify-between">
        <Typography
          component={'p'}
          variant="body2"
          fontWeight={500}
          className="tracking-tight   line-clamp-1 w-[70%]"
          color="common.black"
        >
          سبدخرید غیر فعال شده است
        </Typography>
        {/* ticket status */}
        {/* label must be replaces in here */}
        <div className=" text-secondary-main ">
          <Typography variant="caption" className="!text-xs" fontWeight={900}>
            پاسخ داده شده
          </Typography>
        </div>
      </div>
      {/* body */}
      <div className="w-full  ">
        <div className="w-full ">
          <Typography
            component={'p'}
            className="!text-sm text-common-black text-right !line-clamp-2"
          >
            لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ،
            صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب
            بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می
            نماید، تا از نظر گرافیکی نشانگر چگونگی نوع
          </Typography>
        </div>
        <div className="w-full flex justify-end mt-1.5">
          <Typography variant="caption" fontWeight={600} 
          className="text-gray-400">
           3 روز پیش
          </Typography>
        </div>
      </div>
    </MuiLink>
  );
}

export default LatestTicketCard;
