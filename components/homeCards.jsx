import { GoTools } from 'react-icons/go';
import { BiChip } from 'react-icons/bi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import Link from 'next/link';

const HomeCards = () => {
    return (
        <section className="company-values">
            <h3>the perfect sevices for you</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Ad itaque magnam rem dolor eius magni ratione quas
                autem velit. Illum.
            </p>
            <section className="cards">
                <article className="card">
                    <div className='card__icon'>
                        <GoTools />
                    </div>
                    <h3>pre-build</h3>
                    <p className='card__desc'>
                        Lorem ipsum dolor sit amet consectetur 
                        adipisicing elit. Ea possimus officiis mollitia
                        nulla ut dignissimos assumenda 
                        itaque, voluptates quibusdam libero alias 
                        facere veniam quam tempora!
                    </p>
                </article>
                <article className="card">
                    <div className='card__icon'>
                        <BiChip />
                    </div>
                    <h3>components</h3>
                    <p className='card__desc'>
                        Lorem ipsum quibusdam dolor sit amet consectetur 
                        adipisicing elit. Ea possimus officiis mollitia
                        itaque, voluptates quibusdam libero alias 
                        facere veniam quam tempora!
                    </p>
                </article>
                <article className="card">
                    <div className='card__icon'>
                        <MdOutlineLocalShipping />
                    </div>
                    <h3>shippment</h3>
                    <p className='card__desc'>
                        Lorem ipsum dolor sit amet consectetur 
                        adipisicing elit. Ea possimus officiis mollitia
                        nulla ut dignissimos assumenda 
                        itaque, voluptates quibusdam libero alias 
                        facere veniam quam tempora! libero alias
                        facere veniam quam tempora!
                    </p>
                </article>
            </section>
            <button className="btn btn--big btn--center">
                <Link href="/about">
                    <a>about us</a>
                </Link>
            </button>
        </section>
    );
}

export default HomeCards;