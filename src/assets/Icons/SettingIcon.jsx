import React from "react";

const SettingIcon =({isActive = '#FFFFFF' })=>{
    return(
        <>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_982_138)">
            <path d="M12 8C11.2089 8 10.4355 8.2346 9.77772 8.67412C9.11993 9.11365 8.60723 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61216 14.269 9.17157 14.8284C9.73098 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z" fill={isActive ? '#026980': '#FFFFFF'}/>
            <path d="M21.2938 13.9L20.8498 13.644C21.0497 12.5564 21.0497 11.4416 20.8498 10.354L21.2938 10.098C21.6352 9.90102 21.9345 9.63871 22.1746 9.32606C22.4147 9.01341 22.5908 8.65654 22.6929 8.27582C22.7951 7.8951 22.8212 7.49799 22.7699 7.10716C22.7186 6.71633 22.5908 6.33944 22.3938 5.998C22.1968 5.65656 21.9345 5.35727 21.6219 5.1172C21.3092 4.87714 20.9523 4.70101 20.5716 4.59886C20.1909 4.49672 19.7938 4.47056 19.403 4.52189C19.0121 4.57321 18.6352 4.70102 18.2938 4.898L17.8488 5.155C17.0083 4.43692 16.0425 3.88025 14.9998 3.513V3C14.9998 2.20435 14.6837 1.44129 14.1211 0.87868C13.5585 0.31607 12.7954 0 11.9998 0C11.2041 0 10.4411 0.31607 9.87848 0.87868C9.31587 1.44129 8.9998 2.20435 8.9998 3V3.513C7.95719 3.88157 6.99165 4.4396 6.1518 5.159L5.7048 4.9C5.01524 4.50218 4.19588 4.39457 3.42698 4.60086C2.65808 4.80715 2.00262 5.31044 1.6048 6C1.20697 6.68956 1.09937 7.50892 1.30566 8.27782C1.51195 9.04672 2.01524 9.70218 2.7048 10.1L3.1488 10.356C2.94891 11.4436 2.94891 12.5584 3.1488 13.646L2.7048 13.902C2.01524 14.2998 1.51195 14.9553 1.30566 15.7242C1.09937 16.4931 1.20697 17.3124 1.6048 18.002C2.00262 18.6916 2.65808 19.1948 3.42698 19.4011C4.19588 19.6074 5.01524 19.4998 5.7048 19.102L6.1498 18.845C6.99056 19.5632 7.95678 20.1199 8.9998 20.487V21C8.9998 21.7956 9.31587 22.5587 9.87848 23.1213C10.4411 23.6839 11.2041 24 11.9998 24C12.7954 24 13.5585 23.6839 14.1211 23.1213C14.6837 22.5587 14.9998 21.7956 14.9998 21V20.487C16.0424 20.1184 17.008 19.5604 17.8478 18.841L18.2948 19.099C18.9844 19.4968 19.8037 19.6044 20.5726 19.3981C21.3415 19.1918 21.997 18.6886 22.3948 17.999C22.7926 17.3094 22.9002 16.4901 22.6939 15.7212C22.4876 14.9523 21.9844 14.2968 21.2948 13.899L21.2938 13.9ZM18.7458 10.124C19.0844 11.3511 19.0844 12.6469 18.7458 13.874C18.6867 14.0876 18.7002 14.3147 18.7841 14.5198C18.8681 14.7249 19.0178 14.8963 19.2098 15.007L20.2938 15.633C20.5236 15.7656 20.6913 15.9841 20.7601 16.2403C20.8288 16.4966 20.7929 16.7697 20.6603 16.9995C20.5277 17.2293 20.3092 17.397 20.053 17.4658C19.7967 17.5345 19.5236 17.4986 19.2938 17.366L18.2078 16.738C18.0157 16.6267 17.792 16.5826 17.572 16.6124C17.3521 16.6423 17.1483 16.7445 16.9928 16.903C16.1027 17.8117 14.9814 18.46 13.7498 18.778C13.5348 18.8333 13.3444 18.9585 13.2084 19.1339C13.0724 19.3094 12.9987 19.525 12.9988 19.747V21C12.9988 21.2652 12.8934 21.5196 12.7059 21.7071C12.5184 21.8946 12.264 22 11.9988 22C11.7336 22 11.4792 21.8946 11.2917 21.7071C11.1042 21.5196 10.9988 21.2652 10.9988 21V19.748C10.9989 19.526 10.9252 19.3104 10.7892 19.1349C10.6532 18.9595 10.4628 18.8343 10.2478 18.779C9.01615 18.4597 7.89513 17.81 7.0058 16.9C6.85032 16.7415 6.64654 16.6393 6.42655 16.6094C6.20657 16.5796 5.9829 16.6237 5.7908 16.735L4.7068 17.362C4.59303 17.4287 4.46719 17.4722 4.33652 17.4901C4.20586 17.508 4.07295 17.4998 3.94545 17.4661C3.81795 17.4324 3.69838 17.3738 3.59362 17.2937C3.48886 17.2136 3.40098 17.1135 3.33504 16.9993C3.26909 16.8851 3.22639 16.759 3.2094 16.6282C3.1924 16.4974 3.20144 16.3646 3.23599 16.2373C3.27054 16.11 3.32993 15.9909 3.41073 15.8866C3.49153 15.7824 3.59215 15.6952 3.7068 15.63L4.7908 15.004C4.98275 14.8933 5.13247 14.7219 5.21646 14.5168C5.30044 14.3117 5.31393 14.0846 5.2548 13.871C4.91616 12.6439 4.91616 11.3481 5.2548 10.121C5.31286 9.90788 5.29873 9.68153 5.21461 9.47729C5.13049 9.27305 4.98111 9.10241 4.7898 8.992L3.7058 8.366C3.47599 8.23339 3.30827 8.01492 3.23954 7.75865C3.17081 7.50239 3.20669 7.22931 3.3393 6.9995C3.47191 6.76969 3.69038 6.60197 3.94664 6.53324C4.20291 6.46451 4.47599 6.50039 4.7058 6.633L5.7918 7.261C5.98338 7.37251 6.20658 7.41721 6.42633 7.38807C6.64607 7.35893 6.84991 7.25759 7.0058 7.1C7.89589 6.19134 9.01722 5.54302 10.2488 5.225C10.4644 5.16956 10.6554 5.04375 10.7914 4.8675C10.9275 4.69125 11.0008 4.47464 10.9998 4.252V3C10.9998 2.73478 11.1052 2.48043 11.2927 2.29289C11.4802 2.10536 11.7346 2 11.9998 2C12.265 2 12.5194 2.10536 12.7069 2.29289C12.8944 2.48043 12.9998 2.73478 12.9998 3V4.252C12.9997 4.47396 13.0734 4.68964 13.2094 4.86508C13.3454 5.04052 13.5358 5.16573 13.7508 5.221C14.9828 5.54015 16.1042 6.18988 16.9938 7.1C17.1493 7.25847 17.3531 7.36069 17.573 7.39057C17.793 7.42044 18.0167 7.37626 18.2088 7.265L19.2928 6.638C19.4066 6.5713 19.5324 6.52777 19.6631 6.5099C19.7937 6.49204 19.9266 6.50019 20.0541 6.5339C20.1816 6.56761 20.3012 6.6262 20.406 6.70631C20.5107 6.78642 20.5986 6.88646 20.6646 7.00067C20.7305 7.11488 20.7732 7.24101 20.7902 7.37179C20.8072 7.50257 20.7982 7.63542 20.7636 7.76269C20.7291 7.88997 20.6697 8.00915 20.5889 8.11337C20.5081 8.2176 20.4074 8.30482 20.2928 8.37L19.2088 8.996C19.0178 9.10671 18.8689 9.27748 18.7851 9.48169C18.7014 9.68591 18.6876 9.9121 18.7458 10.125V10.124Z" fill={isActive ? '#026980': '#FFFFFF'}/>
            </g>
            <defs>
            <clipPath id="clip0_982_138">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        </>
    )
}

export default SettingIcon;