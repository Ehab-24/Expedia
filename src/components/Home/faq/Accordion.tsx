import { AnimatePresence, motion } from "framer-motion";
import { FAQ } from ".";
import { IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  faq,
  isOpen,
  onClick,
}: {
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
}) => {
  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <div
        onClick={onClick}
        className=" text-sky-900 tracking-wide text-lg flex items-center justify-between w-full cursor-pointer"
      >
        {faq.question}
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }} className="h-4">
          <IoIosArrowUp size={16} className="text-sky-500" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { y: 32 }, open: { y: 0 } }}
              transition={{ duration: 0.2 }}
              className="w-full px-4 py-2 text-sm"
            >
              {faq.answer}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
