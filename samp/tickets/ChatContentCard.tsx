import { userMockProfile } from '@/_mocks';
import { TicketTypes } from '@/_types/tickets';
import MuiLink from '@/components/Link';
import VoicePlayer from '@/sections/tickets/VoicePlayer';
import { Avatar, Typography } from '@mui/material';
import { IoDocumentTextOutline } from 'react-icons/io5';



const defaultBodyStyles = `max-w-[60%] rounded-t-md bg-secondary-main
                           px-5 py-2.5 text-right text-common-white`;

const adminChatStyle = {
  wrapper: `justify-end`,
  avatar: `order-2 `,
  body: `rounded-br-md rounded-bl-none`,
};

const userChatStyle = {
  wrapper: `justify-start`,
  avatar: ``,
  body: `rounded-bl-md rounded-br-none`,
};

function ChatContentCard(props: TicketTypes.ChatContentProps) {
  const {createdAt, roleFlag } = props;

  return (
    <div
      className={`relative flex w-full items-end gap-x-4 
        ${roleFlag === 0 ? `${adminChatStyle.wrapper}` : `${userChatStyle.wrapper}`} `}
    >
      {/* stickey user avatar */}
      <div
        className={`size-8 rounded-full object-cover 
          ${roleFlag === 0 ? adminChatStyle.avatar : userChatStyle.avatar}`}
      >
        <Avatar
          alt="Cindy Baker"
          src={`${roleFlag === 0 ? `/assets/images/webetologo.png` : userMockProfile}`}

          className={`size-full rounded-full bg-common-white !object-cover 
                    ${roleFlag === 0 ? `p-1` : ``}`}
        />
      </div>
      <div
        className={`flex w-full flex-col gap-y-0.5 
        ${roleFlag === 0 ? 'items-end' : 'items-start'}`}>

        {/* send at ? */}

        <div
          className={`flex h-[20px] w-full max-w-[60%] 
          ${roleFlag === 0 ? 'justify-end pl-2' : 'justify-start pr-2'}`}>

          <Typography variant="caption" fontWeight={500} className="text-primary-main">
            ارسال شده در تاریخ : {new Date(createdAt).toLocaleDateString('fa-IR')}
          </Typography>
        </div>
        <ChatBody {...props} />
      </div>
    </div>
  );
}

const ChatBody = (props: TicketTypes.ChatContentProps) => {
  let styledBaseRoleFlag = null;

  if (props.roleFlag === 0) {
    styledBaseRoleFlag = adminChatStyle.body;
  } else {
    styledBaseRoleFlag = userChatStyle.body;
  }

  const renderbasedChatType = () => {
    switch (props.type) {
      case 'includeFile': {
        return (
          <IncludeFile 
          styles={styledBaseRoleFlag}
          body={props.body} 
          file={props.fileUrl ?? null} />
        );
      }
      case 'onlyFile': {
        return <FileOnly styles={styledBaseRoleFlag} file={props.fileUrl ?? null} />
      }
      case "onlyVoice":{
        return <VoiceOnly styles={styledBaseRoleFlag} file={props.fileUrl ?? null} />;
      }
      default: {
        return <TextOnly styles={styledBaseRoleFlag} body={props.body} />
      }
    }
  };
  return <>{renderbasedChatType()}</>
};




const TextOnly = ({ body, styles }: { body: string; styles: string }) => {
  return (
    <div className={` ${defaultBodyStyles} ${styles}`}>
      <Typography variant="body1">{body}</Typography>
    </div>
  );
};

const IncludeFile = (props: { styles: string; body: string; file: string | null }) => {
  return (
    <div className={`${defaultBodyStyles} ${props.styles} flex flex-col gap-y-5`}>
      <Typography variant="body1">{props.body}</Typography>

      {/* attached file */}
      <MuiLink
        href=""
        className="!mr-auto flex h-full max-h-[200px] w-full max-w-[200px] items-start 
        justify-end gap-x-3 rounded-base bg-secondary-lighter p-2.5"
      >
        <div className="flex flex-col items-start">
          <Typography variant="body1" fontWeight={600} className="text-common-black">
            filename.png
          </Typography>
          <Typography variant="caption" className="!-mt-1 !text-[12px] text-common-black">
            200.2 کیلوبایت
          </Typography>
        </div>

        <div className="flex size-10 items-center justify-center rounded-sm bg-secondary-light">
          <IoDocumentTextOutline size={30} className="text-common-white" />
        </div>
      </MuiLink>
    </div>
  )
}

const FileOnly = ({ styles }: { file: string | null; styles: string }) => {
  return (
    <MuiLink
      href=""
      className={` ${defaultBodyStyles} ${styles} flex items-start justify-between p-3`}>
        
      <div className="!mr-auto flex h-full max-h-[200px] w-full max-w-[200px] items-start justify-end gap-x-10">
        <div className="flex flex-col items-start">
          <Typography variant="body1" fontWeight={600} className="text-common-white">
            filename.png
          </Typography>
          <Typography variant="caption"  className="text-common-white !-mt-1 !text-[12px]">
            200.2 کیلوبایت
          </Typography>
        </div>

        <div className="flex size-10 items-center justify-center rounded-sm bg-secondary-light">
          <IoDocumentTextOutline size={30} className="text-common-white" />
        </div>
      </div>
    </MuiLink>
  );
};




const VoiceOnly = ({ styles,file }: { styles: string; file :string |null}) => {
  return (
    <div className={`${defaultBodyStyles} bg-secondary-main ${styles}`}>
      <VoicePlayer isOutGoing src={file as string} />
    </div>
  );
};
export default ChatContentCard;
