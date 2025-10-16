'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HubPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<any>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic import of Locomotive Scroll for client-side only
    const initSmoothScroll = async () => {
      if (typeof window !== 'undefined') {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (containerRef.current) {
          // Initialize Locomotive Scroll
          scrollerRef.current = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed'
          });

          // Update ScrollTrigger when Locomotive Scroll updates
          scrollerRef.current.on('scroll', ScrollTrigger.update);

          // Setup ScrollTrigger scroller proxy
          ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
              return arguments.length
                ? scrollerRef.current.scrollTo(value, { duration: 0, disableLerp: true })
                : scrollerRef.current.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
              return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
              };
            },
            pinType: containerRef.current?.style.transform ? "transform" : "fixed"
          });

          // Horizontal scrolling animation for pinned section
          if (pinWrapRef.current) {
            const pinWrap = pinWrapRef.current;
            const pinBoxes = pinWrap.querySelectorAll('.pin-item');
            const pinWrapWidth = pinWrap.offsetWidth;
            const horizontalScrollLength = pinWrapWidth - window.innerWidth;

            if (pinBoxes.length > 0 && horizontalScrollLength > 0) {
              gsap.to(pinWrap, {
                scrollTrigger: {
                  scroller: containerRef.current,
                  scrub: 1,
                  trigger: "#sectionPin",
                  pin: true,
                  start: "top top",
                  end: () => `+=${pinWrapWidth}`,
                  invalidateOnRefresh: true
                },
                x: -horizontalScrollLength,
                ease: "none"
              });
            }
          }

          // Enhanced parallax effects for cosmic elements
          gsap.utils.toArray('.cosmic-parallax').forEach((element: any) => {
            gsap.to(element, {
              scrollTrigger: {
                scroller: containerRef.current,
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              },
              y: (i, target) => -50 * (i + 1),
              ease: "none"
            });
          });

          // Stellar glow effects on scroll
          gsap.utils.toArray('.stellar-glow').forEach((element: any, i) => {
            gsap.to(element, {
              scrollTrigger: {
                scroller: containerRef.current,
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
              },
              opacity: 0.8,
              scale: 1.1,
              filter: "blur(0px) brightness(1.2)",
              ease: "power2.inOut"
            });
          });

          // Refresh ScrollTrigger when everything is set up
          ScrollTrigger.addEventListener("refresh", () => scrollerRef.current?.update());
          ScrollTrigger.refresh();
        }
      }
    };

    initSmoothScroll();

    // Cleanup function
    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.destroy();
      }
      ScrollTrigger.killAll();
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Enhanced Cosmic Wave Dividers with Space-Inspired Glows
  const WaveDivider1 = () => (
    <div className="relative h-32 overflow-hidden">
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.path 
          d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
          fill="url(#cosmicBlueGradient1)"
          animate={{ 
            d: [
              "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z", 
              "M0,40 C300,100 900,20 1200,80 L1200,120 L0,120 Z",
              "M0,80 C300,140 900,40 1200,40 L1200,120 L0,120 Z",
              "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))"
          }}
        />
        <defs>
          <linearGradient id="cosmicBlueGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="30%" stopColor="rgba(99, 102, 241, 0.3)" />
            <stop offset="50%" stopColor="rgba(79, 70, 229, 0.5)" />
            <stop offset="70%" stopColor="rgba(99, 102, 241, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
          filter: "blur(20px)"
        }}
        animate={{ x: [-400, 1600] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Cosmic particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-300/60 rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${i * 20}%`,
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.8)"
          }}
          animate={{
            x: [0, 100, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const WaveDivider2 = () => (
    <div className="relative h-32 overflow-hidden">
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        initial={{ opacity: 0, rotateY: 180 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
      >
        <motion.path 
          d="M1200,60 C900,0 300,120 0,60 L0,0 L1200,0 Z" 
          fill="url(#cosmicPurpleGradient2)"
          animate={{ 
            d: [
              "M1200,60 C900,0 300,120 0,60 L0,0 L1200,0 Z", 
              "M1200,80 C900,20 300,100 0,40 L0,0 L1200,0 Z",
              "M1200,40 C900,40 300,80 0,80 L0,0 L1200,0 Z",
              "M1200,60 C900,0 300,120 0,60 L0,0 L1200,0 Z"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            filter: "drop-shadow(0 0 25px rgba(147, 51, 234, 0.7))"
          }}
        />
        <defs>
          <linearGradient id="cosmicPurpleGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.4)" />
            <stop offset="30%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.5)" />
            <stop offset="70%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(-90deg, transparent, rgba(147, 51, 234, 0.12), transparent)",
          filter: "blur(15px)"
        }}
        animate={{ x: [1600, -400] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </div>
  );

  const WaveDivider3 = () => (
    <div className="relative h-24 overflow-hidden">
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      >
        <motion.path 
          d="M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z" 
          fill="rgba(79, 70, 229, 0.3)"
          animate={{ 
            d: [
              "M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z", 
              "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z", 
              "M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z"
            ] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            filter: "drop-shadow(0 0 15px rgba(79, 70, 229, 0.6))"
          }}
        />
      </motion.svg>
    </div>
  );

  const WaveDivider4 = () => (
    <div className="relative h-24 overflow-hidden">
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
      >
        <motion.path 
          d="M1200,80 C1000,120 800,40 600,80 C400,120 200,40 0,80 L0,0 L1200,0 Z" 
          fill="rgba(67, 56, 202, 0.3)"
          animate={{ 
            d: [
              "M1200,80 C1000,120 800,40 600,80 C400,120 200,40 0,80 L0,0 L1200,0 Z", 
              "M1200,60 C1000,100 800,20 600,60 C400,100 200,20 0,60 L0,0 L1200,0 Z", 
              "M1200,80 C1000,120 800,40 600,80 C400,120 200,40 0,80 L0,0 L1200,0 Z"
            ] 
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            filter: "drop-shadow(0 0 18px rgba(67, 56, 202, 0.5))"
          }}
        />
      </motion.svg>
    </div>
  );

  const WaveDivider5 = () => (
    <div className="relative h-24 overflow-hidden">
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <motion.path 
          d="M0,20 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" 
          fill="rgba(88, 28, 135, 0.3)"
          animate={{ 
            d: [
              "M0,20 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z", 
              "M0,60 C200,20 400,100 600,40 C800,20 1000,100 1200,40 L1200,120 L0,120 Z", 
              "M0,20 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            ] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            filter: "drop-shadow(0 0 22px rgba(88, 28, 135, 0.6))"
          }}
        />
      </motion.svg>
    </div>
  );

  const WaveDivider6 = () => (
    <div className="relative h-24 overflow-hidden">
      <motion.svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
      >
        <motion.path 
          d="M1200,40 C900,120 600,40 300,80 C150,100 75,60 0,80 L0,0 L1200,0 Z" 
          fill="rgba(55, 48, 163, 0.3)"
          animate={{ 
            d: [
              "M1200,40 C900,120 600,40 300,80 C150,100 75,60 0,80 L0,0 L1200,0 Z", 
              "M1200,80 C900,40 600,120 300,60 C150,40 75,100 0,60 L0,0 L1200,0 Z", 
              "M1200,40 C900,120 600,40 300,80 C150,100 75,60 0,80 L0,0 L1200,0 Z"
            ] 
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          style={{
            filter: "drop-shadow(0 0 20px rgba(55, 48, 163, 0.7))"
          }}
        />
      </motion.svg>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div 
          id="stars"
          className="absolute inset-0"
          style={{
            width: '1px',
            height: '1px',
            background: 'transparent',
            boxShadow: `1441px 306px #FFF, 420px 787px #FFF, 569px 61px #FFF, 518px 295px #FFF, 264px 374px #FFF, 657px 976px #FFF, 1630px 827px #FFF, 613px 127px #FFF, 1005px 1973px #FFF, 1810px 874px #FFF, 1514px 435px #FFF, 508px 1638px #FFF, 760px 1681px #FFF, 472px 1945px #FFF, 885px 1575px #FFF, 783px 1908px #FFF, 1993px 1276px #FFF, 1903px 1167px #FFF, 1438px 423px #FFF, 119px 1351px #FFF, 214px 700px #FFF, 304px 425px #FFF, 1308px 1253px #FFF, 796px 1686px #FFF, 611px 1849px #FFF, 876px 286px #FFF, 690px 488px #FFF, 1645px 826px #FFF, 1481px 228px #FFF, 1243px 603px #FFF, 221px 219px #FFF, 1997px 998px #FFF, 218px 1971px #FFF, 1306px 1571px #FFF, 1127px 274px #FFF, 1068px 284px #FFF, 1136px 1781px #FFF, 1961px 1913px #FFF, 90px 1205px #FFF, 877px 1909px #FFF, 1550px 1003px #FFF, 516px 862px #FFF, 906px 125px #FFF, 874px 1875px #FFF, 1045px 1550px #FFF, 784px 1371px #FFF, 389px 1166px #FFF, 702px 771px #FFF, 567px 1356px #FFF, 229px 1753px #FFF, 1520px 1938px #FFF, 1743px 1038px #FFF, 1993px 1384px #FFF, 1817px 24px #FFF, 1089px 892px #FFF, 1039px 902px #FFF, 772px 358px #FFF, 190px 1675px #FFF, 383px 1505px #FFF, 1154px 355px #FFF, 1150px 1535px #FFF, 1132px 758px #FFF, 1120px 389px #FFF, 1047px 1027px #FFF, 982px 408px #FFF, 1689px 1618px #FFF, 1427px 429px #FFF, 574px 1561px #FFF, 1170px 572px #FFF, 571px 748px #FFF, 1304px 1404px #FFF, 1955px 624px #FFF, 1899px 471px #FFF, 1978px 1175px #FFF, 198px 1142px #FFF, 789px 644px #FFF, 1267px 193px #FFF, 1867px 1756px #FFF, 588px 705px #FFF, 1391px 403px #FFF, 1320px 194px #FFF, 699px 1274px #FFF, 1253px 138px #FFF, 1259px 12px #FFF, 549px 1306px #FFF, 157px 1468px #FFF, 1821px 1974px #FFF, 488px 594px #FFF, 1229px 1447px #FFF, 1607px 1845px #FFF, 1400px 522px #FFF, 947px 703px #FFF, 1282px 1918px #FFF, 1877px 1016px #FFF, 1327px 784px #FFF, 1020px 1322px #FFF, 1812px 1943px #FFF, 431px 1106px #FFF, 1495px 359px #FFF, 698px 1760px #FFF, 1910px 687px #FFF, 754px 1282px #FFF, 1005px 195px #FFF, 895px 293px #FFF, 1274px 100px #FFF, 394px 1465px #FFF, 1650px 264px #FFF, 1986px 773px #FFF, 1714px 1755px #FFF, 200px 1643px #FFF, 1948px 795px #FFF, 401px 1536px #FFF, 558px 315px #FFF, 391px 512px #FFF, 461px 1423px #FFF, 1572px 506px #FFF, 392px 1210px #FFF, 1734px 1371px #FFF, 1154px 293px #FFF, 1958px 1447px #FFF, 332px 277px #FFF, 1422px 1631px #FFF, 1032px 1540px #FFF, 532px 1390px #FFF, 176px 1618px #FFF, 137px 1084px #FFF, 1993px 1056px #FFF, 1977px 950px #FFF, 1419px 126px #FFF, 684px 326px #FFF, 1754px 600px #FFF, 1510px 440px #FFF, 1614px 370px #FFF, 1265px 49px #FFF, 97px 1685px #FFF, 1181px 1728px #FFF, 616px 1300px #FFF, 1346px 1666px #FFF, 934px 1398px #FFF, 1120px 381px #FFF, 1720px 995px #FFF, 1816px 1560px #FFF, 1473px 1891px #FFF, 1321px 1836px #FFF, 1956px 186px #FFF, 945px 1734px #FFF, 1718px 667px #FFF, 38px 423px #FFF, 198px 1560px #FFF, 1785px 809px #FFF, 284px 593px #FFF, 869px 724px #FFF, 876px 940px #FFF, 1331px 1680px #FFF, 1136px 98px #FFF, 110px 1496px #FFF, 333px 1546px #FFF, 691px 111px #FFF, 1796px 1836px #FFF, 761px 1273px #FFF, 1780px 297px #FFF, 1689px 245px #FFF, 1700px 59px #FFF, 238px 583px #FFF, 119px 1761px #FFF, 1251px 123px #FFF, 1995px 1283px #FFF, 378px 863px #FFF, 1192px 357px #FFF, 1098px 415px #FFF, 1635px 356px #FFF, 1922px 911px #FFF, 644px 305px #FFF, 7px 795px #FFF, 509px 1439px #FFF, 1518px 1365px #FFF, 739px 1624px #FFF, 1615px 1726px #FFF, 715px 1063px #FFF, 1495px 110px #FFF, 1372px 1787px #FFF, 1246px 1774px #FFF, 490px 771px #FFF, 230px 1470px #FFF, 3px 1800px #FFF, 1032px 4px #FFF, 1403px 663px #FFF, 1279px 228px #FFF, 1836px 1052px #FFF, 938px 1628px #FFF, 1516px 1363px #FFF, 448px 1215px #FFF, 1061px 1314px #FFF, 1978px 823px #FFF, 824px 1062px #FFF, 232px 1197px #FFF, 450px 702px #FFF, 1756px 53px #FFF, 1966px 937px #FFF, 923px 1692px #FFF, 187px 58px #FFF, 1978px 1474px #FFF, 379px 1518px #FFF, 732px 614px #FFF, 640px 565px #FFF, 945px 1124px #FFF, 1655px 468px #FFF, 1409px 1573px #FFF, 1386px 1254px #FFF, 1986px 1052px #FFF, 1015px 1490px #FFF, 1334px 469px #FFF, 1030px 998px #FFF, 1029px 1213px #FFF, 534px 1977px #FFF, 1902px 1820px #FFF, 456px 1771px #FFF, 1949px 896px #FFF, 119px 1184px #FFF, 1073px 44px #FFF, 128px 1282px #FFF, 793px 1497px #FFF, 885px 1420px #FFF, 1177px 720px #FFF, 765px 1819px #FFF, 985px 677px #FFF, 846px 112px #FFF, 1679px 449px #FFF, 1764px 867px #FFF, 157px 1210px #FFF, 872px 942px #FFF, 395px 1661px #FFF, 1117px 781px #FFF, 1443px 1932px #FFF, 1963px 1149px #FFF, 1543px 563px #FFF, 954px 831px #FFF, 1559px 1980px #FFF, 29px 1820px #FFF, 1981px 1099px #FFF, 1063px 619px #FFF, 134px 1631px #FFF, 1215px 772px #FFF, 1273px 1294px #FFF, 1327px 1459px #FFF, 101px 1137px #FFF, 240px 1496px #FFF, 1378px 1224px #FFF, 281px 276px #FFF, 721px 312px #FFF, 799px 490px #FFF, 1250px 1215px #FFF, 1242px 1533px #FFF, 347px 712px #FFF, 303px 1126px #FFF, 109px 1882px #FFF, 685px 604px #FFF, 259px 761px #FFF, 1877px 1161px #FFF, 360px 1177px #FFF, 1487px 1422px #FFF, 1500px 1199px #FFF, 578px 1545px #FFF, 1527px 1595px #FFF, 1767px 210px #FFF, 972px 1703px #FFF, 307px 1311px #FFF, 1770px 226px #FFF, 1171px 915px #FFF, 849px 1642px #FFF, 1525px 1643px #FFF, 1953px 220px #FFF, 914px 1476px #FFF, 1014px 871px #FFF, 404px 441px #FFF, 1677px 102px #FFF, 1438px 1040px #FFF, 404px 1845px #FFF, 1933px 631px #FFF, 884px 909px #FFF, 135px 738px #FFF, 630px 1050px #FFF, 126px 1576px #FFF, 522px 1880px #FFF, 1092px 1126px #FFF, 456px 1996px #FFF, 107px 822px #FFF, 785px 777px #FFF, 17px 1359px #FFF, 1434px 479px #FFF, 696px 467px #FFF, 1652px 1314px #FFF, 521px 124px #FFF, 1344px 268px #FFF, 488px 550px #FFF, 535px 1343px #FFF, 171px 1477px #FFF, 532px 728px #FFF, 285px 149px #FFF, 1755px 1972px #FFF, 826px 150px #FFF, 1918px 924px #FFF, 1319px 646px #FFF, 82px 1006px #FFF, 1317px 562px #FFF, 1443px 866px #FFF, 1456px 502px #FFF, 875px 1642px #FFF, 950px 575px #FFF, 1795px 475px #FFF, 1050px 972px #FFF, 1220px 595px #FFF, 1347px 346px #FFF, 978px 72px #FFF, 722px 175px #FFF, 72px 1767px #FFF, 574px 1320px #FFF, 287px 1843px #FFF, 1789px 1229px #FFF, 835px 834px #FFF, 1511px 1448px #FFF, 689px 1707px #FFF, 786px 412px #FFF, 1713px 687px #FFF, 587px 458px #FFF, 1300px 331px #FFF, 1173px 535px #FFF, 1297px 645px #FFF, 1776px 335px #FFF, 1529px 952px #FFF, 156px 1253px #FFF, 1625px 496px #FFF, 409px 1963px #FFF, 1450px 1063px #FFF, 1183px 967px #FFF, 767px 1967px #FFF, 1061px 1045px #FFF, 1674px 1262px #FFF, 1878px 602px #FFF, 1846px 1129px #FFF, 656px 61px #FFF, 496px 1242px #FFF, 690px 1090px #FFF, 1970px 56px #FFF, 1530px 485px #FFF, 1132px 1698px #FFF, 1987px 236px #FFF, 366px 1629px #FFF, 814px 1324px #FFF, 1779px 1230px #FFF, 1931px 1993px #FFF, 645px 139px #FFF, 699px 1641px #FFF, 1210px 1504px #FFF, 631px 560px #FFF, 126px 1117px #FFF, 1410px 13px #FFF, 1881px 629px #FFF, 1850px 1438px #FFF, 807px 431px #FFF, 1751px 1589px #FFF, 1174px 721px #FFF, 1375px 649px #FFF, 36px 1343px #FFF, 1394px 1450px #FFF, 173px 1160px #FFF, 921px 800px #FFF, 1405px 1617px #FFF, 632px 781px #FFF, 358px 1977px #FFF, 1836px 914px #FFF, 493px 1636px #FFF, 1806px 674px #FFF, 406px 492px #FFF, 1059px 447px #FFF, 9px 718px #FFF, 1746px 205px #FFF, 1440px 1026px #FFF, 111px 985px #FFF, 412px 1386px #FFF, 1116px 1310px #FFF, 911px 1298px #FFF, 639px 1336px #FFF, 141px 405px #FFF, 1650px 1280px #FFF, 433px 1323px #FFF, 1433px 645px #FFF, 1117px 1496px #FFF, 894px 60px #FFF, 630px 1582px #FFF, 1908px 1394px #FFF, 1569px 1207px #FFF, 948px 252px #FFF, 333px 943px #FFF, 1659px 1958px #FFF, 1086px 863px #FFF, 1701px 1654px #FFF, 988px 779px #FFF, 603px 1207px #FFF, 858px 226px #FFF, 105px 1360px #FFF, 121px 1057px #FFF, 1502px 891px #FFF, 663px 1821px #FFF, 1737px 967px #FFF, 384px 840px #FFF, 1453px 58px #FFF, 1540px 1681px #FFF, 503px 888px #FFF, 876px 328px #FFF, 261px 1264px #FFF, 350px 54px #FFF, 1464px 122px #FFF, 627px 701px #FFF, 752px 1543px #FFF, 412px 1339px #FFF, 1829px 1024px #FFF, 1909px 1958px #FFF, 713px 760px #FFF, 1794px 986px #FFF, 1847px 1899px #FFF, 22px 813px #FFF, 371px 1548px #FFF, 1786px 1367px #FFF, 1846px 1054px #FFF, 368px 954px #FFF, 193px 910px #FFF, 1704px 201px #FFF, 146px 1531px #FFF, 1616px 710px #FFF, 1371px 52px #FFF, 602px 163px #FFF, 1443px 940px #FFF, 1233px 834px #FFF, 954px 1366px #FFF, 1920px 663px #FFF, 1254px 1777px #FFF, 1261px 13px #FFF, 1314px 1137px #FFF, 626px 1593px #FFF, 841px 469px #FFF, 94px 1726px #FFF, 591px 1793px #FFF, 1390px 1400px #FFF, 1284px 1322px #FFF, 387px 1071px #FFF, 1864px 977px #FFF, 466px 973px #FFF, 651px 1514px #FFF, 646px 681px #FFF, 471px 149px #FFF, 1495px 1358px #FFF, 1362px 1046px #FFF, 141px 833px #FFF, 1463px 1603px #FFF, 1615px 1639px #FFF, 505px 1950px #FFF, 852px 927px #FFF, 1043px 530px #FFF, 885px 485px #FFF, 754px 232px #FFF, 733px 176px #FFF, 16px 1145px #FFF, 1781px 212px #FFF, 1914px 724px #FFF, 312px 267px #FFF, 1085px 589px #FFF, 984px 1253px #FFF, 34px 207px #FFF, 1110px 117px #FFF, 1075px 195px #FFF, 1701px 838px #FFF, 1467px 1682px #FFF, 1886px 1125px #FFF, 1555px 1902px #FFF, 651px 589px #FFF, 528px 1379px #FFF, 1846px 1104px #FFF, 684px 203px #FFF, 688px 958px #FFF, 516px 58px #FFF, 1152px 1467px #FFF, 474px 1395px #FFF, 1713px 1723px #FFF, 1443px 1014px #FFF, 1778px 1643px #FFF, 1295px 1270px #FFF, 1685px 1936px #FFF, 1585px 1681px #FFF, 1688px 1235px #FFF, 1793px 344px #FFF, 1996px 1503px #FFF, 1492px 1910px #FFF, 1958px 1095px #FFF, 188px 1677px #FFF, 1635px 593px #FFF, 1952px 1927px #FFF, 261px 1619px #FFF, 1985px 661px #FFF, 1242px 467px #FFF, 1063px 825px #FFF, 1915px 672px #FFF, 1859px 463px #FFF, 832px 798px #FFF, 1772px 716px #FFF, 618px 969px #FFF, 1985px 408px #FFF, 1588px 861px #FFF, 1344px 530px #FFF, 294px 1655px #FFF, 1843px 1090px #FFF, 1498px 620px #FFF, 1161px 1230px #FFF, 1444px 14px #FFF, 1116px 1609px #FFF, 434px 1007px #FFF, 415px 1754px #FFF, 470px 913px #FFF, 972px 1699px #FFF, 529px 1603px #FFF, 1813px 1962px #FFF, 1622px 705px #FFF, 8px 1290px #FFF, 1538px 1674px #FFF, 1622px 1538px #FFF, 426px 60px #FFF, 1907px 661px #FFF, 959px 99px #FFF, 846px 1258px #FFF, 874px 2px #FFF, 1197px 307px #FFF, 1126px 938px #FFF, 1586px 1062px #FFF, 1678px 243px #FFF, 589px 665px #FFF, 1293px 1613px #FFF, 1874px 1768px #FFF, 1087px 394px #FFF, 194px 1903px #FFF, 1912px 547px #FFF, 1957px 1278px #FFF, 896px 1546px #FFF, 187px 1520px #FFF, 143px 542px #FFF, 1462px 1054px #FFF, 178px 1306px #FFF, 399px 1585px #FFF, 1301px 1046px #FFF, 182px 1362px #FFF, 1170px 670px #FFF, 1111px 1478px #FFF, 1866px 1009px #FFF, 851px 322px #FFF, 1201px 1610px #FFF, 613px 359px #FFF, 1455px 891px #FFF, 89px 1148px #FFF, 794px 324px #FFF, 1147px 1236px #FFF, 1295px 1104px #FFF, 1344px 1328px #FFF, 295px 1049px #FFF, 1674px 1244px #FFF, 157px 1088px #FFF, 189px 1356px #FFF, 392px 1196px #FFF, 682px 720px #FFF, 244px 340px #FFF, 1943px 440px #FFF, 308px 644px #FFF, 1047px 1620px #FFF, 84px 1793px #FFF, 673px 33px #FFF, 1926px 1593px #FFF, 516px 1900px #FFF, 190px 1352px #FFF, 1922px 1462px #FFF, 783px 960px #FFF, 975px 1260px #FFF, 214px 409px #FFF, 768px 1055px #FFF, 1779px 855px #FFF, 572px 1709px #FFF, 116px 741px #FFF, 577px 717px #FFF, 1028px 260px #FFF, 491px 756px #FFF, 1259px 24px #FFF, 1582px 466px #FFF, 994px 864px #FFF, 1802px 1034px #FFF, 1613px 1714px #FFF, 1212px 125px #FFF, 552px 1881px #FFF, 1937px 941px #FFF, 1835px 1618px #FFF, 1008px 1601px #FFF, 37px 1605px #FFF, 1105px 117px #FFF, 136px 1323px #FFF, 1619px 433px #FFF, 127px 1953px #FFF, 1908px 1015px #FFF, 1539px 1381px #FFF, 623px 1039px #FFF, 1732px 522px #FFF, 825px 1643px #FFF, 203px 1332px #FFF, 477px 358px #FFF, 521px 325px #FFF, 1237px 1074px #FFF, 27px 126px #FFF, 1261px 492px #FFF, 1906px 1392px #FFF, 965px 333px #FFF, 104px 342px #FFF, 628px 506px #FFF, 823px 1480px #FFF, 1974px 1619px #FFF, 1921px 1123px #FFF, 1358px 1222px #FFF, 1575px 291px #FFF, 1806px 1772px #FFF, 131px 892px #FFF, 600px 1899px #FFF, 1799px 1637px #FFF, 1079px 657px #FFF, 849px 739px #FFF, 518px 952px #FFF, 1570px 1162px #FFF, 96px 1103px #FFF, 411px 1362px #FFF, 1119px 992px #FFF, 1786px 72px #FFF, 394px 299px #FFF, 1695px 1640px #FFF, 1675px 1714px #FFF, 152px 1550px #FFF, 1563px 1517px #FFF, 499px 1081px #FFF, 1035px 66px #FFF, 1028px 493px #FFF, 40px 1912px #FFF, 1387px 1096px #FFF, 1161px 1787px #FFF, 1155px 368px #FFF, 213px 1814px #FFF, 1416px 393px #FFF, 917px 1591px #FFF, 434px 746px #FFF, 935px 1710px #FFF, 1403px 29px #FFF, 591px 1622px #FFF, 568px 1003px #FFF, 1746px 494px #FFF, 12px 1976px #FFF, 1230px 385px #FFF, 1916px 792px #FFF, 1825px 1475px #FFF, 801px 614px #FFF, 244px 996px #FFF, 1352px 610px #FFF, 1955px 335px #FFF, 1299px 686px #FFF, 868px 1692px #FFF, 1097px 1405px #FFF, 1600px 1573px #FFF, 451px 1943px #FFF, 978px 1203px #FFF, 1099px 976px #FFF, 587px 1371px #FFF, 99px 1157px #FFF, 350px 1556px #FFF, 1317px 814px #FFF, 1450px 667px #FFF, 1497px 47px #FFF, 986px 1471px #FFF, 410px 1286px #FFF, 1637px 944px #FFF, 1443px 1518px #FFF, 538px 134px #FFF, 1229px 1060px #FFF, 1605px 1417px #FFF, 1440px 778px #FFF, 970px 807px #FFF, 1317px 640px #FFF, 1537px 1954px #FFF, 1377px 1827px #FFF, 950px 594px #FFF, 125px 889px #FFF, 1030px 1842px #FFF, 463px 1602px #FFF, 711px 181px #FFF, 1180px 1425px #FFF, 665px 478px #FFF, 1585px 830px #FFF, 1244px 1764px #FFF, 1081px 1687px #FFF, 1422px 61px #FFF, 1713px 1417px #FFF`,
            animation: 'starfield 50s linear infinite'
          }}
        />
        
        <div 
          id="stars2"
          className="absolute inset-0"
          style={{
            width: '2px',
            height: '2px',
            background: 'transparent',
            boxShadow: `1883px 1407px #FFF, 1925px 1918px #FFF, 1382px 1609px #FFF, 69px 1829px #FFF, 1806px 264px #FFF, 505px 352px #FFF, 1167px 21px #FFF, 1073px 490px #FFF, 1577px 1182px #FFF, 720px 365px #FFF, 591px 1538px #FFF, 1768px 1200px #FFF, 1845px 1798px #FFF, 1343px 800px #FFF, 1411px 1966px #FFF, 1815px 552px #FFF, 107px 1131px #FFF, 1262px 1228px #FFF, 1544px 1639px #FFF, 769px 100px #FFF, 555px 869px #FFF, 1186px 1200px #FFF, 1732px 1455px #FFF, 1519px 1422px #FFF, 1454px 506px #FFF, 720px 340px #FFF, 1815px 1600px #FFF, 374px 1242px #FFF, 272px 321px #FFF, 347px 712px #FFF, 1431px 722px #FFF, 794px 1022px #FFF, 1190px 986px #FFF, 267px 1142px #FFF, 896px 631px #FFF, 1244px 174px #FFF, 1825px 6px #FFF, 903px 631px #FFF, 1781px 1216px #FFF, 1516px 765px #FFF, 1890px 188px #FFF, 562px 1854px #FFF, 830px 108px #FFF, 1740px 428px #FFF, 1939px 1813px #FFF, 1862px 1051px #FFF, 786px 481px #FFF, 659px 919px #FFF, 63px 1731px #FFF, 913px 719px #FFF, 1959px 1590px #FFF, 155px 1617px #FFF, 1210px 1064px #FFF, 810px 967px #FFF, 574px 1128px #FFF, 1630px 381px #FFF, 777px 1167px #FFF, 1528px 887px #FFF, 713px 871px #FFF, 106px 646px #FFF, 1441px 271px #FFF, 1314px 440px #FFF, 1556px 790px #FFF, 145px 1440px #FFF, 1217px 1942px #FFF, 1766px 879px #FFF, 68px 806px #FFF, 1172px 1908px #FFF, 210px 1376px #FFF, 430px 1817px #FFF, 1280px 594px #FFF, 1831px 865px #FFF, 1068px 1315px #FFF, 906px 354px #FFF, 1698px 501px #FFF, 1430px 1977px #FFF, 711px 1014px #FFF, 1827px 1641px #FFF, 1096px 1371px #FFF, 350px 300px #FFF, 1706px 1806px #FFF, 959px 484px #FFF, 1525px 219px #FFF, 1056px 1747px #FFF, 710px 400px #FFF, 1142px 1555px #FFF, 72px 111px #FFF, 762px 863px #FFF, 351px 1261px #FFF, 1304px 1375px #FFF, 1956px 118px #FFF, 831px 1145px #FFF, 1939px 696px #FFF, 1326px 374px #FFF, 1605px 1404px #FFF, 1000px 17px #FFF, 1207px 283px #FFF, 1141px 1119px #FFF, 549px 774px #FFF, 885px 1019px #FFF, 1637px 1315px #FFF, 1026px 940px #FFF, 732px 1508px #FFF, 1128px 1018px #FFF, 795px 1856px #FFF, 740px 742px #FFF, 1758px 262px #FFF, 735px 1137px #FFF, 1601px 1778px #FFF, 847px 1431px #FFF, 1754px 1509px #FFF, 1406px 133px #FFF, 940px 1406px #FFF, 1053px 1505px #FFF, 1190px 221px #FFF, 936px 1885px #FFF, 1799px 546px #FFF, 194px 1807px #FFF, 1611px 276px #FFF, 1017px 365px #FFF, 540px 921px #FFF, 590px 667px #FFF, 1333px 1291px #FFF, 632px 1753px #FFF, 1225px 1440px #FFF, 1221px 344px #FFF, 891px 37px #FFF, 1611px 454px #FFF, 422px 1155px #FFF, 173px 1884px #FFF, 226px 1192px #FFF, 1149px 926px #FFF, 1627px 947px #FFF, 1852px 1006px #FFF, 858px 1623px #FFF, 1309px 797px #FFF, 1773px 1378px #FFF, 649px 967px #FFF, 609px 961px #FFF, 1335px 817px #FFF, 58px 1225px #FFF, 1897px 500px #FFF, 1344px 1762px #FFF, 924px 418px #FFF, 79px 1425px #FFF, 1638px 761px #FFF, 194px 1941px #FFF, 723px 1055px #FFF, 1906px 156px #FFF, 1803px 1389px #FFF, 967px 1245px #FFF, 435px 1612px #FFF, 1243px 1503px #FFF, 109px 210px #FFF, 1255px 261px #FFF, 409px 831px #FFF, 304px 365px #FFF, 645px 1660px #FFF, 350px 692px #FFF, 1445px 367px #FFF, 413px 1266px #FFF, 1210px 1852px #FFF, 1860px 812px #FFF, 884px 823px #FFF, 411px 1525px #FFF, 1124px 1056px #FFF, 745px 1729px #FFF, 1112px 1419px #FFF, 1528px 788px #FFF, 678px 999px #FFF, 555px 1630px #FFF, 32px 945px #FFF, 669px 1330px #FFF, 1513px 1444px #FFF, 1729px 555px #FFF, 1966px 1188px #FFF, 963px 214px #FFF, 836px 1961px #FFF, 956px 184px #FFF, 1277px 402px #FFF, 1145px 556px #FFF, 1076px 1141px #FFF, 674px 1798px #FFF, 921px 1131px #FFF, 1955px 1635px #FFF, 958px 1875px #FFF, 147px 527px #FFF, 772px 730px #FFF, 557px 1151px #FFF, 1556px 57px #FFF, 471px 1811px #FFF, 1431px 693px #FFF, 940px 1544px #FFF, 1752px 499px #FFF, 200px 1076px #FFF, 624px 1107px #FFF, 1467px 618px #FFF, 954px 1943px #FFF, 878px 822px #FFF, 248px 1343px #FFF`,
            animation: 'starfield 100s linear infinite'
          }}
        />
        
        <div 
          id="stars3"
          className="absolute inset-0"
          style={{
            width: '3px',
            height: '3px',
            background: 'transparent',
            boxShadow: `1227px 1637px #FFF, 296px 1083px #FFF, 880px 1457px #FFF, 1768px 1385px #FFF, 49px 1446px #FFF, 1600px 1102px #FFF, 591px 747px #FFF, 1100px 1258px #FFF, 967px 158px #FFF, 1836px 1800px #FFF, 612px 462px #FFF, 645px 1597px #FFF, 27px 1609px #FFF, 305px 343px #FFF, 1431px 1620px #FFF, 1266px 745px #FFF, 163px 1979px #FFF, 787px 1768px #FFF, 1362px 183px #FFF, 925px 398px #FFF, 108px 1466px #FFF, 1755px 1710px #FFF, 1214px 331px #FFF, 1533px 999px #FFF, 592px 1547px #FFF, 225px 804px #FFF, 773px 1480px #FFF, 1942px 991px #FFF, 1545px 1878px #FFF, 1421px 1045px #FFF, 1433px 586px #FFF, 760px 543px #FFF, 216px 666px #FFF, 1692px 893px #FFF, 1379px 1548px #FFF, 900px 1239px #FFF, 165px 1666px #FFF, 619px 156px #FFF, 1810px 1930px #FFF, 641px 1806px #FFF, 1263px 444px #FFF, 1784px 1419px #FFF, 1997px 494px #FFF, 843px 511px #FFF, 578px 218px #FFF, 360px 586px #FFF, 1438px 265px #FFF, 1971px 1357px #FFF, 536px 260px #FFF, 1641px 1044px #FFF, 457px 438px #FFF, 1678px 1218px #FFF, 1477px 997px #FFF, 1782px 1383px #FFF, 1348px 203px #FFF, 313px 1490px #FFF, 1557px 1230px #FFF, 1742px 986px #FFF, 679px 1831px #FFF, 905px 997px #FFF, 474px 106px #FFF, 644px 1161px #FFF, 766px 1461px #FFF, 518px 887px #FFF, 948px 1765px #FFF, 1823px 553px #FFF, 1934px 594px #FFF, 81px 108px #FFF, 479px 96px #FFF, 1038px 1322px #FFF, 760px 896px #FFF, 1141px 570px #FFF, 1566px 289px #FFF, 1744px 1163px #FFF, 179px 1270px #FFF, 1609px 240px #FFF, 1947px 505px #FFF, 1065px 1957px #FFF, 38px 152px #FFF, 401px 396px #FFF, 397px 476px #FFF, 139px 1427px #FFF, 1210px 179px #FFF, 1330px 110px #FFF, 959px 1879px #FFF, 691px 1485px #FFF, 380px 1800px #FFF, 1325px 1815px #FFF, 105px 1755px #FFF, 314px 622px #FFF, 871px 210px #FFF, 1573px 1654px #FFF, 909px 953px #FFF, 1571px 149px #FFF, 1876px 901px #FFF, 109px 1282px #FFF, 1578px 1863px #FFF, 393px 1163px #FFF, 286px 651px #FFF, 420px 1644px #FFF`,
            animation: 'starfield 150s linear infinite'
          }}
        />
      </div>

      {/* Deep Space Background Gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at bottom, rgba(27, 39, 53, 0.8) 0%, rgba(9, 10, 15, 0.9) 100%)`,
          zIndex: 1
        }}
        animate={{
          background: [
            "radial-gradient(ellipse at bottom, rgba(27, 39, 53, 0.8) 0%, rgba(9, 10, 15, 0.9) 100%)",
            "radial-gradient(ellipse at bottom, rgba(32, 44, 58, 0.75) 0%, rgba(14, 15, 20, 0.85) 100%)",
            "radial-gradient(ellipse at bottom, rgba(27, 39, 53, 0.8) 0%, rgba(9, 10, 15, 0.9) 100%)"
          ]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Cosmic Stellar Orbs with Deep Space Colors */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {/* Glowing Stars */}
        <motion.div 
          className="absolute top-20 left-20 w-4 h-4 bg-blue-400/60 rounded-full shadow-lg shadow-blue-400/30"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          style={{ 
            filter: "blur(1px)",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)"
          }}
        />
        <motion.div 
          className="absolute top-32 right-32 w-3 h-3 bg-purple-400/50 rounded-full"
          animate={{ 
            opacity: [0.2, 0.7, 0.2],
            scale: [0.6, 1.4, 0.6]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          style={{ 
            filter: "blur(0.5px)",
            boxShadow: "0 0 15px rgba(147, 51, 234, 0.5), 0 0 30px rgba(147, 51, 234, 0.2)"
          }}
        />

        {/* Nebula-like Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)"
          }}
          animate={{ 
            x: [0, 60, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 70%)"
          }}
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
            opacity: [0.12, 0.22, 0.12]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0.03) 50%, transparent 70%)"
          }}
          animate={{ 
            x: [0, 80, 0], 
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 8
          }}
        />

        {/* Additional Cosmic Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              top: `${10 + (i * 7)}%`,
              left: `${5 + (i * 8)}%`,
              filter: "blur(0.5px)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* CSS for starfield animation */}
      <style jsx>{`
        @keyframes starfield {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
      
      {/* Content Wrapper */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section with Enhanced Parallax */}
        <motion.section 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
            style={{ y: 0 }}
            whileInView={{ y: [-20, 0] }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-6"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ 
                  backgroundSize: "200% 200%",
                  filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))"
                }}
              >
                The Hub
              </motion.h1>
              <motion.p 
                className="text-2xl md:text-3xl text-slate-200 mb-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  textShadow: "0 0 20px rgba(147, 51, 234, 0.3)"
                }}
              >
                Your Gateway to Knowledge and Collaboration
              </motion.p>
              <motion.p 
                className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Access resources, documentation, and connect with the community to drive success.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: [
                    "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)",
                    "0 25px 50px rgba(59, 130, 246, 0.4), 0 0 80px rgba(147, 51, 234, 0.3)",
                    "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)"
                  ]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.7 },
                  scale: { duration: 0.8, delay: 0.7 },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: "0 30px 60px rgba(59, 130, 246, 0.5), 0 0 100px rgba(147, 51, 234, 0.4)",
                  background: "linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.8))"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 text-white"
                style={{
                  background: "linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6), rgba(79, 70, 229, 0.6))",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <span className="relative z-10">Explore the Hub</span>
                {/* Cosmic shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)"
                  }}
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Wave Divider 1 */}
        <WaveDivider1 />

        {/* Knowledge Center Section with Enhanced Scroll Effects */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
        >
          {/* Cosmic Floating Background Elements */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 border border-blue-400/30 rounded-full"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))"
              }}
            />
            <motion.div
              className="absolute top-20 right-20 w-24 h-24 border border-purple-400/25 rounded-full"
              animate={{ 
                rotate: [360, 0],
                x: [0, 20, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                filter: "drop-shadow(0 0 12px rgba(147, 51, 234, 0.4))"
              }}
            />
            {/* Cosmic dust particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-300/50 rounded-full"
                style={{
                  top: `${15 + (i * 10)}%`,
                  left: `${10 + (i * 12)}%`,
                  filter: "blur(0.5px)",
                  boxShadow: "0 0 6px rgba(59, 130, 246, 0.6)"
                }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 8 + (i * 0.5),
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              {...fadeInUp} 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Knowledge Center
              </motion.h2>
              <motion.p 
                className="text-xl text-slate-300 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Access a wide range of curated resources to help make the most of the tools and services offered. 
                Whether it's guides, tutorials, or best practices, the Knowledge Center is designed to support every step of the journey.
              </motion.p>
            </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Guides",
                description: "Step-by-step walkthroughs to help users get started with your tools or services.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Documentation",
                description: "API docs, user manuals, and technical specifications.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                title: "FAQs",
                description: "Common questions and detailed answers to assist with troubleshooting.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link href="/resources">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-800 border border-slate-600 text-white px-8 py-3 rounded-full hover:border-blue-500 transition-all duration-300"
              >
                Browse Resources
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

        {/* Wave Divider 2 */}
        <WaveDivider2 />

        {/* Community Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Community</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Engage with fellow professionals, developers, and experts in the field. 
              The community space is where ideas meet collaboration and innovation thrives.
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Forums",
                description: "Access to discussion forums for users to ask questions, share solutions, and connect.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                )
              },
              {
                title: "Events",
                description: "A calendar of upcoming events, webinars, or community-driven activities.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Meetups",
                description: "Links to virtual or physical meetups, or collaborative spaces like Slack/Discord groups.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Join the Conversation
            </motion.button>
          </motion.div>
        </div>
      </section>

        {/* Wave Divider 3 */}
        <WaveDivider3 />

      {/* Tools & Downloads Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Essential Tools</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Find the software, tools, and plugins necessary for seamless integration and development.
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Software Downloads",
                description: "Links to download software or access cloud-based tools.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                title: "API Access",
                description: "Provide access to your API for developers or data scientists to leverage your technology.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: "Integrations",
                description: "Showcase compatible integrations with other platforms or tools.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="text-green-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12 space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all duration-300"
            >
              Download Tools
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800 border border-slate-600 text-white px-8 py-3 rounded-full hover:border-green-500 transition-all duration-300"
            >
              Access API
            </motion.button>
          </motion.div>
        </div>
      </section>

        {/* Wave Divider 4 */}
        <WaveDivider4 />

        {/* Knowledge Sharing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Learn & Share</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Contribute to the collective knowledge by sharing insights, solutions, and code. 
              Whether you're submitting tutorials or contributing to open-source projects, the knowledge-sharing section fosters collaboration.
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Submit a Tutorial",
                description: "Allow users to submit their own tutorials or articles.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              },
              {
                title: "Open-Source Projects",
                description: "Showcase any open-source repositories or code that the community can contribute to.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "User Stories",
                description: "Share success stories and case studies from the community.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="text-yellow-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
            >
              Share Knowledge
            </motion.button>
          </motion.div>
        </div>
      </section>

        {/* Wave Divider 5 */}
        <WaveDivider5 />

      {/* Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need Help?</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Get support when it's needed. From technical issues to general questions, we've got you covered.
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Contact Support",
                description: "Direct link to a support form or email.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Troubleshooting Guides",
                description: "Links to troubleshooting FAQs or error resolutions.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              {
                title: "Live Chat",
                description: "Option for live customer support or chatbot assistance.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="text-red-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300"
            >
              Get Support
            </motion.button>
          </motion.div>
        </div>
      </section>

        {/* Wave Divider 6 */}
        <WaveDivider6 />

        {/* Get Involved Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Involved</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Help shape the future of satellite intelligence. Explore opportunities to collaborate, contribute, and grow.
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Contribute",
                description: "Information on how users can contribute to your product or services.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Beta Testing",
                description: "Offer opportunities to become beta testers for new features or services.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Partnerships",
                description: "Provide details on partnership or collaboration opportunities.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="text-indigo-400 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Become a Contributor
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
};

export default HubPage;