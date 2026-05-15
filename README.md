Q1: En React SPA, apres un POST il fallait mettre a jour le state (ex: setProjects) ou refaire un fetch. Ici, la Server Action fait revalidatePath('/dashboard') et la page se met a jour.

Q2: Le body du PUT de rename contient tous les champs utiles du projet (name et color) pour garder les donnees completes.

Q3: Parce que Dashboard est un Server Component: pas de onClick client direct. Le form envoie les donnees au serveur de facon native.

Q4: On voit un JSON avec la liste des projets.

Q5: API Route = endpoint HTTP reutilisable (web, mobile, externe). Server Action = mutation liee a l'UI Next/React (souvent via form action).

Q6: Le login Next.js avec useActionState retire plusieurs useState (email, password, loading, erreur), donc moins de code client.

Q7: Oui, le cookie 'session' est visible dans l'onglet Cookies. Non, avec HttpOnly il n'est pas lisible via document.cookie.

Q8: Avec middleware, la page protegee ne se charge pas du tout sans session. Redirection immediate avant rendu (pas de flash).

Q9: middleware.ts doit etre a la racine du projet car Next.js le detecte comme point d'entree global d'interception.

Q10: En React SPA, on utilisait souvent Context/useAuth + state client pour garder l'utilisateur. Ici le layout lit directement le cookie cote serveur.

Q11: Pour un formulaire de creation dans l'app Next: Server Action. Pour une app mobile partageant la meme API: API Routes.

Q12: Avantage securite: cookie HttpOnly + controle middleware cote serveur. Le token/sessions n'est pas expose au JavaScript client.

Q13: Oui, les API Routes continuent de fonctionner sans json-server car Next.js gere deja le backend et lit/ecrit dans db.json.

Q14: Non, un script XSS ne peut pas voler un cookie HttpOnly via JavaScript.
