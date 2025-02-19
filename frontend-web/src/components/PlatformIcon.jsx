export default function PlatformIcon({platform}) {
    return (
        <div>
            <img src={`/icons/${platform.toLowerCase()}.svg`} alt={`${platform.toLowerCase()} icon`} className="w-10 h-10" />
        </div>
    );
}