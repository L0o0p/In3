import './index.css'
import React, { useEffect, useState } from 'react';
import { useSocketIO } from './useOpenGenerate/useSocketIO'; // 确保路径正确
import { postGenerate } from './useOpenGenerate';

export const Iconator = () => {
    const { socket } = useSocketIO();
    const [prompt, setPrompt] = useState('')
    const premise = 'Icon, app icon, flat, iOS style, not realist, cartoon, simple,minimalism'
    const [data, setData] = useState<{
        data: Uint8Array, headers: {
            imageID: string,
            pipelineID: string,
            progress: string,
            taskID: string,
            type: string,
            tempUrl?: string
        }
    } | null>(null);

    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {

        const handlePayload = (payload: any) => {
            // console.log(1);
            setData(payload)
            // console.log(payload);

            const arrayBufferView = new Uint8Array(payload.data);
            const blob = new Blob([arrayBufferView], { type: 'image/webp' });
            const urlCreator = window.URL || window.webkitURL;
            const url = urlCreator.createObjectURL(blob);
            setUrl((oldurl) => {
                if (oldurl) {
                    urlCreator.revokeObjectURL(oldurl)
                }
                return url
            })
        }
        socket?.on('progress', handlePayload)

        socket?.on('finish', (payload: any) => {
            handlePayload(payload)
            // do sth when fin
        })
    }, [socket])
    const onButtonClick = () => {
        postGenerate({ prompt, premise })
            .catch(error => {
                console.error('请求失败:', error);
                // 可以设置一个状态来显示错误信息
            });

        // 确保socket已连接
        console.log('clicked the genbutton', prompt, premise, data)
    }

    return (
        <div className='bg'>
            <div className='topBar'>
                <div className='lf'>
                    <div className='timeIfo'>9:41</div>
                </div>
                <div className='md'>
                    <div className='island'></div>
                </div>
                <div className='rg'>
                    <div className='iconInfo'>
                        <div style={{
                            width: '27.401px',
                            height: '13px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
                                <path d="M10.5494 3C10.5494 2.44772 10.9971 2 11.5494 2H12.5494C13.1017 2 13.5494 2.44772 13.5494 3V11C13.5494 11.5523 13.1017 12 12.5494 12H11.5494C10.9971 12 10.5494 11.5523 10.5494 11V3Z" fill="black" />
                                <path d="M15.5494 1C15.5494 0.447715 15.9971 0 16.5494 0H17.5494C18.1017 0 18.5494 0.447715 18.5494 1V11C18.5494 11.5523 18.1017 12 17.5494 12H16.5494C15.9971 12 15.5494 11.5523 15.5494 11V1Z" fill="black" />
                                <path d="M5.54938 6.5C5.54938 5.94772 5.99709 5.5 6.54938 5.5H7.54938C8.10166 5.5 8.54938 5.94772 8.54938 6.5V11C8.54938 11.5523 8.10166 12 7.54938 12H6.54938C5.99709 12 5.54938 11.5523 5.54938 11V6.5Z" fill="black" />
                                <path d="M0.549377 9C0.549377 8.44772 0.997093 8 1.54938 8H2.54938C3.10166 8 3.54938 8.44772 3.54938 9V11C3.54938 11.5523 3.10166 12 2.54938 12H1.54938C0.997093 12 0.549377 11.5523 0.549377 11V9Z" fill="black" />
                            </svg>
                        </div>
                        <div style={{
                            width: '27.401px',
                            height: '13px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.04984 2.58753C11.5164 2.58764 13.8886 3.55505 15.6763 5.28982C15.8109 5.42375 16.026 5.42206 16.1586 5.28603L17.4454 3.96045C17.5125 3.89146 17.5499 3.798 17.5494 3.70076C17.5488 3.60353 17.5103 3.51052 17.4424 3.44234C12.7505 -1.14745 5.34845 -1.14745 0.65654 3.44234C0.588575 3.51047 0.550012 3.60345 0.549385 3.70069C0.548758 3.79792 0.58612 3.89141 0.653201 3.96045L1.94034 5.28603C2.07283 5.42226 2.28816 5.42396 2.42269 5.28982C4.21053 3.55494 6.58304 2.58752 9.04984 2.58753ZM9.08529 6.58937C10.4405 6.58929 11.7474 7.10346 12.7519 8.03199C12.8878 8.16376 13.1018 8.16091 13.2343 8.02555L14.5195 6.69997C14.5872 6.63044 14.6248 6.53611 14.6238 6.4381C14.6228 6.34008 14.5834 6.24656 14.5144 6.17844C11.4553 3.27385 6.7179 3.27385 3.65882 6.17844C3.58973 6.24656 3.5503 6.34013 3.54939 6.43817C3.54849 6.53622 3.58617 6.63054 3.654 6.69997L4.93891 8.02555C5.07136 8.16091 5.2854 8.16376 5.42127 8.03199C6.42516 7.10408 7.73097 6.58995 9.08529 6.58937ZM11.6989 9.17672C11.7009 9.27501 11.663 9.36977 11.5943 9.43863L9.37103 11.7289C9.30585 11.7962 9.217 11.834 9.12429 11.834C9.03157 11.834 8.94272 11.7962 8.87754 11.7289L6.6539 9.43863C6.58521 9.36972 6.54742 9.27492 6.54946 9.17663C6.55149 9.07834 6.59317 8.98527 6.66466 8.91938C8.08453 7.69354 10.164 7.69354 11.5839 8.91938C11.6553 8.98532 11.697 9.07843 11.6989 9.17672Z" fill="black" />
                            </svg>
                        </div>
                        <div style={{
                            width: '27.401px',
                            height: '13px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="13" viewBox="0 0 28 13" fill="none">
                                <path opacity="0.35" d="M1.04938 4C1.04938 2.067 2.61638 0.5 4.54938 0.5H21.5494C23.4824 0.5 25.0494 2.067 25.0494 4V9C25.0494 10.933 23.4824 12.5 21.5494 12.5H4.54938C2.61638 12.5 1.04938 10.933 1.04938 9V4Z" stroke="black" />
                                <path opacity="0.4" d="M26.5493 5V9.22034C27.3984 8.86291 27.9505 8.0314 27.9505 7.11017C27.9505 6.18894 27.3984 5.35744 26.5493 5Z" fill="black" />
                                <path d="M2.54938 4C2.54938 2.89543 3.44481 2 4.54938 2H21.5494C22.6539 2 23.5494 2.89543 23.5494 4V9C23.5494 10.1046 22.6539 11 21.5494 11H4.54938C3.44481 11 2.54938 10.1046 2.54938 9V4Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='contentTop'>
                    <div className='contentHeader'>
                        <div className='headerText'>
                            ICONATOR
                        </div>
                        <div className='headerIcon'>
                            <div className='action'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    <path d="M16.4986 32.9992C25.5375 32.9992 33 25.5368 33 16.4978C33 7.4748 25.5245 -0.000793457 16.4855 -0.000793457C7.46249 -0.000793457 0 7.4748 0 16.4978C0 25.5368 7.47559 32.9992 16.4986 32.9992Z" fill="black" />
                                    <path d="M16.567 25.5426C11.9775 25.5426 8.32785 22.4766 7.53212 18.0362H5.91765C5.09764 18.0362 4.90502 17.2469 5.36341 16.6129L7.97869 12.9718C8.47223 12.3186 9.27627 12.3448 9.73051 12.9718L12.3908 16.6129C12.8464 17.2469 12.6464 18.0362 11.8206 18.0362H10.2538C10.9885 20.7334 13.514 22.7507 16.567 22.7507C18.0233 22.7507 19.1333 22.3072 20.2463 21.4715C20.9902 20.9419 21.7725 20.9495 22.3332 21.6099C22.8983 22.2484 22.7124 23.1454 21.8707 23.777C20.5037 24.8784 18.5698 25.5426 16.567 25.5426ZM16.5407 7.40363C21.1302 7.40363 24.7667 10.4696 25.5756 14.9099H27.1085C27.9286 14.9099 28.1212 15.6993 27.6628 16.3333L25.0474 19.9613C24.5539 20.6305 23.7499 20.5883 23.2825 19.9613L20.6354 16.3333C20.1798 15.6993 20.3799 14.9099 21.1924 14.9099H22.851C22.1163 12.1997 19.5908 10.1824 16.5407 10.1824C15.0815 10.1824 13.9714 10.6389 12.8614 11.4746C12.1174 11.994 11.3191 11.9966 10.7745 11.3363C10.2225 10.7006 10.3924 9.80072 11.237 9.15609C12.601 8.07061 14.5378 7.40363 16.5407 7.40363Z" fill="white" />
                                </svg>
                            </div>
                            <div className='action'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    <path d="M16.5 32.9992C7.45312 32.9992 0 25.5617 0 16.4992C0 7.45233 7.4375 -0.000793457 16.5 -0.000793457C25.5469 -0.000793457 33 7.45233 33 16.4992C33 25.5617 25.5625 32.9992 16.5 32.9992ZM16.375 17.9836C16.9062 17.9836 17.3281 17.5617 17.3281 17.0461V9.68671L17.1875 8.88983L17.8594 9.62421L18.3281 10.1242C18.4844 10.3117 18.7188 10.4055 19.0156 10.4055C19.5469 10.4055 19.9062 10.0617 19.9062 9.56171C19.9062 9.29608 19.8125 9.07733 19.6094 8.88983L17.0469 6.43671C16.8281 6.21796 16.5938 6.10858 16.375 6.10858C16.1406 6.10858 15.9062 6.21796 15.6875 6.43671L13.1406 8.88983C12.9375 9.07733 12.8438 9.29608 12.8438 9.56171C12.8438 10.0617 13.2188 10.4055 13.7344 10.4055C14.0312 10.4055 14.25 10.3117 14.4219 10.1242L14.8906 9.62421L15.5625 8.88983L15.4219 9.68671V17.0461C15.4219 17.5617 15.8438 17.9836 16.375 17.9836ZM11.9844 24.2961H20.7812C22.5625 24.2961 23.5312 23.3586 23.5312 21.5461V14.093C23.5312 12.3117 22.5781 11.3273 20.7812 11.3273H18.7188V13.3117H20.75C21.2812 13.3117 21.5469 13.6086 21.5469 14.1555V21.4992C21.5469 22.0617 21.2812 22.3586 20.75 22.3586H12.0156C11.4844 22.3586 11.2031 22.0773 11.2031 21.4992V14.1555C11.2031 13.6086 11.4844 13.3117 12.0156 13.3117H14.0469V11.3273H11.9844C10.1875 11.3273 9.23438 12.3273 9.23438 14.093V21.5461C9.23438 23.343 10.2188 24.2961 11.9844 24.2961Z" fill="black" />
                                </svg>
                            </div>
                            <div className='action'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    <circle cx="16.5" cy="16.4992" r="16.5" fill="black" />
                                    <path d="M16.5 26.5826C22.0162 26.5826 26.5834 22.0055 26.5834 16.4992C26.5834 10.9831 22.0063 6.41589 16.4901 6.41589C10.9838 6.41589 6.41669 10.9831 6.41669 16.4992C6.41669 22.0055 10.9937 26.5826 16.5 26.5826ZM16.5 24.902C11.834 24.902 8.10713 21.1652 8.10713 16.4992C8.10713 11.8332 11.8241 8.09645 16.4901 8.09645C21.1561 8.09645 24.8929 11.8332 24.9028 16.4992C24.9127 21.1652 21.166 24.902 16.5 24.902ZM11.8834 17.9326C12.6743 17.9326 13.3169 17.2901 13.3169 16.4893C13.3169 15.6985 12.6644 15.0559 11.8834 15.0559C11.0827 15.0559 10.4401 15.6985 10.4401 16.4893C10.4401 17.2901 11.0827 17.9326 11.8834 17.9326ZM16.4901 17.9326C17.281 17.9326 17.9334 17.2901 17.9334 16.4893C17.9334 15.6985 17.281 15.0559 16.4901 15.0559C15.6993 15.0559 15.0468 15.6985 15.0468 16.4893C15.0468 17.2901 15.6993 17.9326 16.4901 17.9326ZM21.1067 17.9326C21.8976 17.9326 22.5401 17.2901 22.5401 16.4893C22.5401 15.6985 21.8976 15.0559 21.1067 15.0559C20.306 15.0559 19.6634 15.6985 19.6634 16.4893C19.6634 17.2901 20.306 17.9326 21.1067 17.9326Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='preview'>
                        <img src={url || 'https://telegraph-image-3k8.pages.dev/file/928a3b2569d791f7e650d.png'} alt="Preview" />
                    </div>
                </div>
                <div className='contentBottom'>
                    <div className='promptInput'>
                        <input
                            type="text"
                            placeholder="Type your prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            style={{
                                width: '290px',
                                height: '200px',
                                backgroundColor: '#F2F2F2',
                                // opacity: 0
                            }}
                        >
                        </input>
                    </div>
                    <div
                        className='generateButton'
                        onClick={() => {/* 这里可以添加触发图片生成的代码，比如发送一个请求到服务器 */ onButtonClick() }}
                        style={{ cursor: 'pointer !important' }}
                    >
                        <div className='generateText'>
                            Generate
                        </div>
                    </div>
                    <div className='homeBar'>
                        <div className='homeBarBar'></div>
                    </div>
                </div>

            </div>
        </div >
        // <iframe
        //     style={{
        //         maxWidth: ' 100rem',
        //         height: '820px'
        //     }}
        //     src='https://iconator.cytelab.net/#/'
        // />
    )
}

