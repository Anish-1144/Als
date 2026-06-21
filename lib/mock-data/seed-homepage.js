// Copyright (C) 2025 Anuj
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// Home page seed data
export const homepageSeedData = {
    title: 'Home Page',
    hero: {
        title: 'Build Your Tomorrow with',
        titleHighlight: 'The Right Lending Strategy',
        subtitle: 'At ALS Mortgage Solutions, we partner with you to secure the right loan for your financial goals. With over 20 years of experience and access to 30+ lenders, we make homeownership and investment dreams a reality.',
        imageUrl: '/hero.jpg',
        imageAlt: 'ALS Mortgage Solutions hero',
        ctaPrimary: 'Get Pre-Approved',
        ctaSecondary: 'Calculate Borrowing Power'
    },
    services: {
        sectionTitle: 'Comprehensive Lending Solutions',
        sectionSubtitle: 'From first home buyers to seasoned investors, we provide tailored mortgage solutions for every stage of your property journey.',
        cards: [
            {
                title: 'Buy a Home',
                description: 'Explore tailored home loan solutions for first-time buyers, upgraders, and specialized financing options to turn your property dreams into reality.',
                link: '/home-loans',
                linkLabel: 'Learn More',
            },
            {
                title: 'Buy an Investment',
                description: 'Build your property portfolio with expert investment loan solutions, equity strategies, and tax-effective structures for wealth creation.',
                link: '/investment-loans',
                linkLabel: 'Learn More',
            },
            {
                title: 'Refinance',
                description: 'Save thousands with better rates, access your equity, or consolidate debt. Discover refinancing solutions tailored to your financial goals.',
                link: '/refinancing',
                linkLabel: 'Learn More',
            },
        ],
    },
    whyChooseUs: {
        sectionTitle: 'Why Australians Invest With Us',
        sectionSubtitle: 'More than 36,000 Australian businesses and individuals choose us as their mortgage brokers.',
        backgroundImage: { url: '/section2.jpg' },
        features: [
            {
                title: 'Ethical Lending',
                description: 'ALS is genuinely different – an award-winning broker with no hidden financial incentives and no questionable referral partners.',
                icon: 'HiShieldCheck'
            },
            {
                title: 'Diverse Lending Panel',
                description: 'With more than 30 bank and non-bank partners on our lending panel, finding the right mortgage is simple.',
                icon: 'MdAccountBalance'
            },
            {
                title: 'Strategic Approach',
                description: 'Your loan should be one that supports your ideal future – whether that\'s a multi-property portfolio or a stress-free retirement.',
                icon: 'HiLightBulb'
            },
            {
                title: 'Connect With Experts',
                description: 'Access our network of leading property professionals to get the advice you need – no referral commissions involved.',
                icon: 'IoHandshake'
            }
        ],
        stats: [
            { value: '11+', label: 'Years Experience' },
            { value: '2+', label: 'Lenders' },
            { value: '300+', label: 'Happy Clients' },
            { value: '10+', label: 'Awards Won' }
        ]
    },
    propertyShowcase: {
        sectionTitle: 'How it works',
        sectionSubtitle: 'From dream homes to investment properties, we help you secure the financing for your property goals.',
        steps: [
            {
                title: 'Consultation',
                description: 'We begin with a comprehensive discussion about your financial goals, current situation, and property aspirations.',
            },
            {
                title: 'Documentation',
                description: 'We guide you through the document collection process, making it as simple as possible.',
            },
            {
                title: 'Lender Search',
                description: 'We search across our panel of 25+ lenders to find the best loan options for your situation.',
            },
            {
                title: 'Application',
                description: 'Once you\'ve chosen your preferred lender, we handle the entire application process.',
            },
            {
                title: 'Settlement',
                description: 'We support you through settlement and beyond. Our relationship doesn\'t end when the loan settles.',
            },
        ],
    },
    cta: {
        title: 'Ready to Start Your Property Journey?',
        subtitle: 'Get in touch with our expert team today for a free consultation and personalized lending solution.',
        buttonText: 'Get Started',
        buttonLink: '/contact',
    },
    teamSection: {
        sectionTitle: 'Meet the Strategists Working for You',
        sectionSubtitle: 'Our experienced team of mortgage professionals is dedicated to finding the right lending solution for your unique situation.'
    },
    awards: {
        sectionTitle: 'Australia\'s Most Awarded Independent Mortgage Brokerage',
        description: 'Recognized for excellence in mortgage broking, customer service, and industry innovation. Our awards reflect our commitment to helping Australians achieve their property dreams.',
        founderName: 'Androse Hrudayadasan',
        founderTitle: 'Managing Director & Principal Mortgage Broker'
    },
    isActive: true
};
// Testimonials seed data
export const testimonialsSeedData = [
    {
        clientName: 'Sarah & Michael Johnson',
        clientTitle: 'First Home Buyers',
        clientImage: '',
        testimonial: 'ALS Mortgage Solutions made our first home buying experience stress-free. Androse guided us through every step and secured us an amazing rate. We couldn\'t be happier with our new home!',
        rating: 5,
        loanType: 'home-loan',
        featured: true,
        order: 1,
        isActive: true
    },
    {
        clientName: 'David Chen',
        clientTitle: 'Property Investor',
        clientImage: '',
        testimonial: 'I\'ve used ALS for three investment properties now. Their strategic approach and diverse lender panel always get me the best deals. Highly recommend for serious investors.',
        rating: 5,
        loanType: 'investment-loan',
        featured: true,
        order: 2,
        isActive: true
    },
    {
        clientName: 'Emma Rodriguez',
        clientTitle: 'Business Owner',
        clientImage: '',
        testimonial: 'The commercial loan process was seamless with ALS. They understood my business needs and found a lender that others couldn\'t. Exceptional service from start to finish.',
        rating: 5,
        loanType: 'commercial-loan',
        featured: true,
        order: 3,
        isActive: true
    },
    {
        clientName: 'James & Lisa Thompson',
        clientTitle: 'Refinancing Clients',
        clientImage: '',
        testimonial: 'Refinancing with ALS saved us $400 per month! Their transparent approach and no hidden fees policy gave us complete confidence throughout the process.',
        rating: 5,
        loanType: 'refinancing',
        featured: true,
        order: 4,
        isActive: true
    },
    {
        clientName: 'Robert Mitchell',
        clientTitle: 'SMSF Trustee',
        clientImage: '',
        testimonial: 'ALS helped my SMSF purchase a commercial property. Their expertise in SMSF lending regulations was invaluable. Professional and knowledgeable team.',
        rating: 5,
        loanType: 'smsf-loan',
        featured: true,
        order: 5,
        isActive: true
    },
    {
        clientName: 'Karen Williams',
        clientTitle: 'Single Mother',
        clientImage: '',
        testimonial: 'As a single mum, I thought buying a home was impossible. ALS found me a lender and helped with the First Home Owner Grant. Now my daughter has her own backyard!',
        rating: 5,
        loanType: 'home-loan',
        featured: true,
        order: 6,
        isActive: true
    }
];
// Team seed data
export const teamSeedData = [
    {
        name: 'Androse Hrudayadasan',
        title: 'Managing Director & Principal Mortgage Broker',
        image: '/images/androse.jpg',
        bio: 'With over 20 years in the mortgage industry, Androse leads ALS with a vision of ethical lending and client-first service. His expertise spans all areas of mortgage broking.',
        experience: '20+ Years Experience',
        specialties: [
            { specialty: 'Residential Mortgages' },
            { specialty: 'Commercial Lending' },
            { specialty: 'SMSF Loans' },
            { specialty: 'Strategic Planning' }
        ],
        phone: '1300 257 467',
        email: 'androse@alsmortgagesolutions.com.au',
        linkedin: '',
        showOnHomepage: true,
        order: 1,
        isActive: true
    },
    {
        name: 'John Martis',
        title: 'Credit/Operation Manager',
        image: '',
        bio: 'John brings over 15 years of experience in both Australian and US residential mortgage markets, ensuring operational excellence and exceptional customer service.',
        experience: '15+ Years Experience',
        specialties: [
            { specialty: 'Credit Assessment' },
            { specialty: 'Operations Management' },
            { specialty: 'Risk Management' },
            { specialty: 'Client Relations' }
        ],
        phone: '03 9087 7719',
        email: 'johnm@alsmortgagesolutions.com.au',
        linkedin: '',
        showOnHomepage: true,
        order: 2,
        isActive: true
    },
    {
        name: 'Navin Gregory Lobo',
        title: 'Credit Support Associate',
        image: '',
        bio: 'Navin is passionate about delivering exceptional customer service with over 15 years in client relationship management. He ensures our clients are satisfied with every outcome.',
        experience: '15+ Years Experience',
        specialties: [
            { specialty: 'Client Support' },
            { specialty: 'Application Processing' },
            { specialty: 'Customer Service' },
            { specialty: 'Relationship Management' }
        ],
        phone: '03 9087 7719',
        email: 'navinl@alsmortgagesolutions.com.au',
        linkedin: '',
        showOnHomepage: true,
        order: 3,
        isActive: true
    },
    {
        name: 'Benetta Blaze',
        title: 'Admin Associate',
        image: '',
        bio: 'Benetta handles post-settlement enquiries with dedication and attention to detail, ensuring clients have peace of mind knowing their accounts and repayments are properly set up.',
        experience: 'New to Industry',
        specialties: [
            { specialty: 'Post Settlement Support' },
            { specialty: 'Administration' },
            { specialty: 'Client Care' },
            { specialty: 'Documentation' }
        ],
        phone: '03 9087 7718',
        email: 'benettab@alsmortgagesolutions.com.au',
        linkedin: '',
        showOnHomepage: true,
        order: 4,
        isActive: true
    }
];
