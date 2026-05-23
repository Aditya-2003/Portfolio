import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function InfiniteText() {

    useEffect(() => {
        const lenis = new Lenis()
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, [])

    const container = useRef();
    const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })

    return (
        <main ref={container} className='relative overflow-hidden bg-linear-to-b from-black via-[#0d0a06]  to-[#120e07]'>
            <div className='h-[10vh]' />
            <Slide direction={'left'} left={"-80%"} progress={scrollYProgress}/>
            <Slide direction={'right'} left={"-5%"} progress={scrollYProgress} />
            <Slide direction={'left'}  left={"-115%"} progress={scrollYProgress} />
            <div className='h-[10vh]' />
        </main>
    );
}

const Slide = (props) => {
     const direction = props.direction == 'left' ? -1 : 1;
     const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])

    return (
        <motion.div style={{ left: props.left, x: translateX }} className="relative flex whitespace-nowrap text-[#EDE7DF] ">
            <Phrase />
            <Phrase />
            <Phrase />
        </motion.div>
    )
}

const Phrase = ({ text }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={'px-5 flex gap-5 items-center bebas-neue'}>
            <p className='text-[6.5vw]'>Modern Websites &nbsp;<span className='text-[#f9d46f]'>·</span> &nbsp;AI-Assisted Systems &nbsp;<span className='text-[#f9d46f]'>·</span> &nbsp;Product Engineering &nbsp;<span className='text-[#f9d46f]'>·</span> &nbsp;Automation &nbsp;<span className='text-[#f9d46f]'>·</span> &nbsp;Interaction Design</p>
            <span className="relative h-[6.5vw] aspect-[4/2] rounded-full overflow-hidden">
            </span>
        </motion.div>
    )
}