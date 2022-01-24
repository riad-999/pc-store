import Image from "next/image";
import Link from "next/link";

const HomeMainSection = () => {
    return (
        <section className="main-section">
            <div className="main-section__desc">
                <h2>build your computer</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ex delectus ut autem libero, non beatae obcaecati ipsa consectetur
                    tempore quisquam explicabo doloribus aperiam quidem sapiente
                    consequuntur! Voluptatum similique suscipit minus!.
                </p>
                <Link href="/prosucts/index">
                    <button type="button" className="btn btn--big">
                        <a>go shoping</a>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default HomeMainSection;