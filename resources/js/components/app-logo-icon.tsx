import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            enableBackground="new 0 0 32 32"
            xmlSpace="preserve"
            fill="#000000"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
                <rect
                    x={6}
                    y={11}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    width={20}
                    height={13}
                />
                <rect
                    x={4}
                    y={24}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    width={24}
                    height={3}
                />
                <polygon
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    points="28,10 16,5 4,10 4,11 28,11 "
                />
                <line
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    x1={18}
                    y1={24}
                    x2={18}
                    y2={11}
                />
                <line
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    x1={22}
                    y1={24}
                    x2={22}
                    y2={11}
                />
                <line
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    x1={10}
                    y1={24}
                    x2={10}
                    y2={11}
                />
                <line
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeMiterlimit={10}
                    x1={14}
                    y1={24}
                    x2={14}
                    y2={11}
                />
            </g>
        </svg>
    );
}
