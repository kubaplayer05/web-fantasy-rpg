interface RarityProps {
    rarity: string
}

export default function Rarity({rarity}: RarityProps) {

    let color = "text-white"

    switch (rarity) {
        case "COMMON":
            color = "text-white"
            break
        case "UNCOMMON":
            color = "text-green-400"
            break
        case "RARE":
            color = "text-blue-400"
            break
        case "EPIC":
            color = "text-violet-400"
            break
        case "LEGENDARY":
            color = "text-orange-400"
            break
    }

    return (
        <span className={`${color} text-xl lowercase`}>{rarity}</span>
    )
}