Q1: En React (Vite), on cree des routes avec React Router dans App.tsx et des imports manuels. En Next.js, le routing est base sur les dossiers/fichiers dans app/. Chaque dossier devient une route automatiquement.

Q2: Pour la route /login, j'ai cree 1 fichier: app/login/page.tsx. Avec React Router, il faut en general le composant + la declaration de route + l'import dans App.tsx.

Q3: En Next.js, l'id est recupere via params passe en props au composant de page (cote serveur). En React SPA, useParams() est un hook client.

Q4: Le Header global est dans layout.tsx. Il reste monte pendant la navigation, seul le contenu de la page change.

Q5: En React SPA, il faut plus de lignes (useState + useEffect + fetch + loading + error). Ici, en Server Component, quelques lignes async/await suffisent.

Q6: Dans F12 Network du navigateur, on ne voit pas GET /projects de la meme facon, car la requete est faite par le serveur Next.js. Le client recoit deja le HTML rendu.

Q7: Il faut 'use client' dans Login car on utilise useState, onChange et onSubmit (interactivite navigateur). Dashboard n'en a pas besoin car c'est un Server Component.

Q8: L'equivalent de useNavigate() en Next.js est useRouter() puis router.push('/...').

Q9: Dans React SPA (View Source), on voit surtout une coquille HTML (ex: div root + scripts), pas les donnees projets directement.

Q10: Dans Next.js (View Source), les donnees du dashboard peuvent deja etre presentes dans le HTML rendu par le serveur (SSR).

Q11: En React Router, pour garder un header fixe, on faisait souvent un layout parent (ex: composant AppLayout avec Outlet) qui englobe les pages.

Q12: Pour un layout specifique Dashboard, on cree app/dashboard/layout.tsx.

Q13: Non, un Server Component ne peut pas gerer onClick directement, car il ne tourne pas dans le navigateur. Les handlers d'evenements sont cote client.

Q14: Non, pas besoin de transformer toute la page. On peut garder la page en Server Component et ajouter un petit composant enfant Client Component pour le bouton interactif.

Q15: Avantage securite: on evite d'exposer directement certaines URLs/services internes au navigateur, et on peut centraliser controles, validation et gestion des secrets cote serveur.
