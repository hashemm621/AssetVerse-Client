import React, { useState } from "react";
import { motion } from "framer-motion";
import MyContainer from "../../components/MyContainer";

const faqData = [
  {
    question: "What is AssetVerse?",
    answer:
      "AssetVerse is a corporate asset management system that helps companies efficiently track and manage all physical assets, ensuring accountability and reducing administrative overhead.",
  },
  {
    question: "How do employees request assets?",
    answer:
      "Employees can request assets via the 'Request Asset' dashboard. HR managers approve the request, which automatically affiliates the employee if it's their first request.",
  },
  {
    question: "Can an employee be affiliated with multiple companies?",
    answer:
      "Yes, AssetVerse supports multiple affiliations. An employee can request assets from different companies and manage them from a single dashboard.",
  },
  {
    question: "How does package management work?",
    answer:
      "HR managers get a default package (5 employees). When the limit is reached, they can upgrade the subscription through Stripe payment integration.",
  },
  {
    question: "Are the assets returnable?",
    answer:
      "Yes, assets can be marked as returnable. Employees can return these assets, and the system updates inventory automatically.",
  },
  {
    question: "Is AssetVerse mobile-friendly?",
    answer:
      "Absolutely! AssetVerse is fully responsive and works seamlessly across mobile, tablet, and desktop devices.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-base-200">
      <MyContainer>
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="text-3xl text-primary font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Got questions? We have answers. Learn how AssetVerse can simplify
            asset management for your company.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md border p-5 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => toggleFAQ(idx)}>
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">{item.question}</h4>
                <span className="text-2xl font-bold">
                  {activeIndex === idx ? "-" : "+"}
                </span>
              </div>
              {activeIndex === idx && (
                <motion.p
                  className="mt-3 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}>
                  {item.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </MyContainer>
    </section>
  );
};

export default FAQ;
