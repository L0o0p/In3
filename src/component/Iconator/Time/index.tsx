import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date()); // 初始化状态为当前时间

    useEffect(() => {
        // 创建一个定时器，每分钟更新时间
        const timerId = setInterval(() => {
            setTime(new Date()); // 更新时间
        }, 60000); // 每60000毫秒，即每分钟更新一次

        // 组件卸载时清除定时器
        return () => clearInterval(timerId);
    }, []); // 空依赖数组表示这个 effect 不依赖于任何外部变量，只在组件挂载时运行一次

    // 使用 toLocaleTimeString() 并定制时间格式
    const timeString = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 如果你不需要12小时制，可以设置为 false
    });

    return (
        <div className='timeIfo'>{timeString}</div>

    );
}

export default Clock;