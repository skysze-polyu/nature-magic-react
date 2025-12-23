/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CERTIFICATIONS } from '../constants';

const CertificationsPreview: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-[#F5F2EB] border-b border-[#D6D1C7]">
        <div className="max-w-[1800px] mx-auto">
            <div className="text-center mb-12">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-3">Our Credentials</span>
                <h3 className="text-3xl font-serif text-[#2C2A26]">Certified Excellence</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {CERTIFICATIONS.map(cert => (
                    <div key={cert.id} className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/40 hover:shadow-lg glass-panel border-transparent hover:border-white/20">
                        <div className="w-16 h-16 mb-4 text-[#5D5A53] group-hover:text-[#2C2A26] transition-colors">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path d={cert.iconPath as string} />
                            </svg>
                        </div>
                        <h4 className="text-sm font-bold text-[#2C2A26] uppercase tracking-wider mb-2">{cert.name}</h4>
                        <p className="text-xs text-[#A8A29E] font-light leading-normal">{cert.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default CertificationsPreview;