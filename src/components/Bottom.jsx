import { Star } from "lucide-react"
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom"

const Bottom = () => {
    return (
        <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Walk with Legends?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    Let people walk with those who bled for truth, wrote in fire, and died unheard.
                </p>
                <Link to="/stories">
                    <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                        <Star className="h-5 w-5 mr-2" />
                        Begin Your Journey
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default Bottom