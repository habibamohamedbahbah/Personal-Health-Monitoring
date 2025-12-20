// Initialize Blog page
function initBlogPage() {
    // Blog functionality
    const blogPosts = document.querySelectorAll('.post');
    const singlePost = document.getElementById('single');
    const blogSection = document.querySelector('.blog-section');
    
    if (blogPosts.length && singlePost && blogSection) {
        blogPosts.forEach(post => {
            post.addEventListener('click', () => {
                const id = post.dataset.id - 1;
                if (posts && posts[id]) {
                    const p = posts[id];
                    singlePost.innerHTML = `
                        <a href="#" class="back-btn" onclick="backToBlog()">← Back</a>
                        <img src="${p.img}" alt="${p.title}">
                        <h1>${p.title}</h1>
                        ${p.content}
                    `;
                    blogSection.style.display = 'none';
                    singlePost.style.display = 'block';
                    singlePost.classList.add('active');
                }
            });
        });
    }
}

// Blog posts data
const posts = [
    {
        title: "How to build a supportive community in group therapy sessions",
        img: "images/blo_image_1.jpg",
        content: "<p>A supportive community in group therapy is created through clear guidelines, emotional safety, and active participation. Therapists should encourage empathy, model positive behavior, and use group activities to help members connect. Shared goals and reflection time strengthen trust and create a sense of belonging. When people feel safe, heard, and respected, the group becomes a powerful space for healing and growth.</p><p>Simple habits that protect your body as it grows and becomes stronger.</p>"
    },
    {
        title: "Overcoming anxiety: the role of psychologists in mental health",
        img: "images/blog_image_2.jpg",
        content: "<p>Psychologists play a key role in helping individuals overcome anxiety by providing a safe space to understand their feelings, identify triggers, and develop healthier coping strategies. Through evidence-based therapies like CBT, mindfulness training, and behavior modification, they guide people in changing negative thought patterns and managing stress more effectively. Psychologists also offer long-term emotional support, teach practical skills for everyday life, and help individuals build confidence as they work toward recovery and overall mental well-being.</p>"
    },
    {
        title: "Tips for Improving Foot Pain",
        img: "images/blog_image_3.jpg",
        content: "<p>Foot pain can often be relieved with simple daily habits. Start by wearing supportive, well-fitted shoes and avoiding long periods of standing. Gentle stretching of the calves, arches, and toes helps reduce tension. Applying ice can ease swelling, while warm foot soaks relax tight muscles. Maintaining a healthy weight lowers pressure on the feet, and using cushioned insoles or orthotics adds extra support. If pain continues or gets worse, consulting a physical therapist or podiatrist ensures proper diagnosis and treatment.</p>"
    },
    {
        title: "The Importance of Movement",
        img: "images/blog-img-6.jpg",
        content: "<p>Movement is essential for maintaining both physical and mental health. Regular activity improves strength, flexibility, and circulation while reducing the risk of chronic pain and injury. It also boosts mood, lowers stress, and enhances energy levels. Even simple daily movements—like walking, stretching, or light exercise—help keep the body balanced and the mind clear. Consistent movement is one of the easiest and most effective ways to support overall well-being.</p>"
    },
    {
        title: "Heat & Acupuncture: Reduces neck pain",
        img: "images/blog-img-04.jpg",
        content: "<p>Heat therapy and acupuncture are effective natural remedies for neck pain relief. Heat helps relax tense muscles, improve circulation, and reduce stiffness, making it ideal for chronic pain and muscle tension. Acupuncture works by stimulating specific points that release endorphins and restore energy flow, addressing both physical tension and underlying imbalances. When combined, these therapies provide comprehensive relief while promoting overall wellness and preventing future pain.</p>"
    },
    {
        title: "Stretching Techniques for Better Flexibility & Strength",
        img: "images/blog.jpg",
        content: "<p>Regular stretching is essential for building flexibility and maintaining muscle strength throughout life. Dynamic stretches before exercise prepare muscles for movement and improve performance, while static stretches after activity help reduce soreness and enhance recovery. Incorporating full-body stretching routines—targeting legs, back, shoulders, and arms—increases range of motion and prevents injuries. Consistent stretching also improves posture, reduces tension, and boosts physical confidence. Even just 10-15 minutes daily can transform flexibility and keep your body feeling strong and balanced.</p>"
    }
];
 // BLOG POST READ MORE FUNCTIONALITY - Truncate text
    document.querySelectorAll('.post').forEach(post => {
        const paragraph = post.querySelector('.post-content p');
        const btn = post.querySelector('.read-more');
        
        if (paragraph && btn) {
            const fullText = paragraph.textContent;
            const truncateLength = 200; // عدد الأحرف
            const truncated = fullText.substring(0, truncateLength) + '...';
            
            paragraph.setAttribute('data-full-text', fullText);
            paragraph.setAttribute('data-truncated', truncated);
            
            
            paragraph.textContent = truncated;
            
          
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (paragraph.classList.contains('expanded')) {

                    paragraph.textContent = truncated;
                    paragraph.classList.remove('expanded');
                    btn.textContent = 'Read more';
                } else {
    
                    paragraph.textContent = fullText;
                    paragraph.classList.add('expanded');
                    btn.textContent = 'Show less';
                }
            });
        }
    });
    

// Back to blog function
window.backToBlog = function() {
    const singlePost = document.getElementById('single');
    const blogSection = document.querySelector('.blog-section');
    
    if (singlePost && blogSection) {
        singlePost.style.display = 'none';
        singlePost.classList.remove('active');
        blogSection.style.display = 'block';
    }
};
