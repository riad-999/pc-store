import Link from "next/link";

const AboutSection = () => {
    return (
        <main className="about">
            <h2>our story</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsa tempore laborum sed cupiditate eveniet neque vel sit est minus, vero, aliquam facilis temporibus beatae consectetur voluptas voluptatem. Nisi tempora soluta sunt commodi eum. Dignissimos quibusdam illo natus voluptates pariatur quidem sed eius? Aliquam necessitatibus hic sit porro earum impedit.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum placeat illum dolor maxime incidunt perspiciatis, eum reprehenderit aspernatur? Quam reiciendis eaque eos exercitationem corporis? At nobis architecto voluptates aspernatur porro.
                Lorem ipsum d Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptatum, voluptas neque facere quas totam alias deserunt ab veritatis consequuntur iure non vitae, exercitationem sunt pariatur cum, repudiandae maiores ut.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga numquam ducimus nostrum quibusdam sapiente consequuntur odio quos aperiam debitis cum dolor dolorem, est mollitia tempore nihil, enim molestiae explicabo adipisci nesciunt, suscipit quod commodi praesentium. Ad accusantium ipsam nisi architecto asperiores quasi sint minima exercitationem.
            </p>
            <button className="btn btn--big">
                <Link href="/">
                    <a>back home</a>
                </Link>
            </button>
        </main>
    );
}

export default AboutSection;