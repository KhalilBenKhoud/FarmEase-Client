import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  showFields: boolean = false;
  isPool: boolean = false;
  description !: string ;
  showComments !: boolean ;
  
  post = {
    title_Post: '',
    description_Post: '',
    date_Post: new Date().toISOString(), // Default to current date and time
    nbr_like_post: 0, // Initialize to 0
    nbr_signal_post: 0, // Initialize to 0
    category_post: '', // Initialize to empty string
    sondage1: '',
    sondage2: '',
    stat1: 0, // Initialize to 0
    stat2: 0 // Initialize to 0
  };
  constructor(private postService: PostService,private commentService : CommentService) { }
  
 
  
  addComment( postId: number) {

    const comment = {
   
      description_comment :  this.description ,
      date_Comment: new Date(), // Convert to ISO 8601 string

      nbr_like_Comment: 0, // Initialize to 0
      nbr_signal_Comment: 0, // Initialize to 0
      
    };
   
    console.log(comment) 
    this.commentService.addComment(comment,postId).subscribe(
      (response) => {
        // Traitement à effectuer après l'ajout réussi du commentaire, si nécessaire
        console.log('Comment added successfully:', response);
        // Rafraîchir les données si nécessaire après l'ajout du commentaire
        // Exemple : this.fetchPosts();
      },
      (error) => {
        // Traitement en cas d'erreur lors de l'ajout du commentaire
        console.error('Error adding comment:', error);
      }
    );
  }
  
  toggleComments(id : number) {
    this.posts.find(p => p.id_Post == id).commentaire.length > 0 ? this.posts.find(p => p.id_Post == id).commentaire = []
    : setTimeout(() => {this.fetchPosts() ;},100) ;
  }
  toggleComment(post: any) {
    post.showCommentField = !post.showCommentField;
  }
  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      // Appel de la méthode pour charger les commentaires pour chaque post
      this.loadCommentsForPosts();
    });
  }

 loadCommentsForPosts() {
    // Boucle sur chaque post pour charger les commentaires
    this.posts.forEach(post => {
      this.commentService.getCommentsByPostId(post.id_Post).subscribe(comments => {
        // Assignez les commentaires au post correspondant
        console.log(comments) ;
        post.comments = comments;
      });
    });
  }
/*  loadCommentsForPosts(postId: number): void {
    this.commentService.getCommentsByPostId(postId)
      .subscribe(comments => {
        // Assigner les commentaires récupérés à la propriété post.comments
        this.posts.find(post => post.id_Post === postId).comments = comments;
      });
  }*/
  


  likePost(post: any) {
    // Appeler la méthode incrementLike du service ForumService
    this.postService.incrementLike(post.id_Post).subscribe(
      (response) => {
        console.log('Like incremented successfully:', response);
        post.nbr_like_post = response.updatedLikes;

        // Rafraîchir la liste des posts après avoir incrémenté le like
        this.fetchPosts();
     
      },
      (error) => {
        console.error('Error incrementing like:', error);
      }
    );
  }
  
  signalpost(post: any) {
    // Appeler la méthode incrementLike du service ForumService
    this.postService.incrementSignal(post.id_Post).subscribe(
      (response) => {
        console.log('signal incremented successfully:', response);
        post.nbr_signal_post= response.updatedSignals;

        // Rafraîchir la liste des posts après avoir incrémenté le like
        this.fetchPosts();
     
      },
      (error) => {
        console.error('Error incrementing signal:', error);
      }
    );
  }
  vote1(post: any) {
    this.postService.incrementStat1(post.id_Post).subscribe(
      (response) => {
        console.log('stat1 incremented successfully:', response);
        this.fetchPosts(); // Mettre à jour les données après avoir voté
      },
      (error) => {
        console.error('Error incrementing stat1:', error);
      }
    );
  }
  
  vote2(post: any) {
    this.postService.incrementStat2(post.id_Post).subscribe(
      (response) => {
        console.log('stat2 incremented successfully:', response);
        this.fetchPosts(); // Mettre à jour les données après avoir voté
      },
      (error) => {
        console.error('Error incrementing stat2:', error);
      }
    );
  }
     
  signalPost(post: any) {
    post.nbr_signal_post++;
  }
  ngOnInit() {
    // Fetch posts when the component initializes
    this.loadPosts();
    setTimeout(() => {
      console.log(this.posts) ;

    },3000)
   

  }

  addPostOrPool() {
    if (this.isPool) {
      this.addPool(); // Si c'est un pool, appeler la fonction addPool
    } else {
      this.addPost(); // Sinon, appeler la fonction addPost
    }
  }

  addPost() {
    // Initialiser nbr_like_post et nbr_signal_post à 0
    this.post.nbr_like_post = 0;
    this.post.nbr_signal_post = 0;




    // Call addPost function from ForumService
    this.postService.addPost(this.post).subscribe(
      (response) => {
        console.log('Post added successfully:', response);

       this.resetPostFields();
        // After adding, fetch posts again to update the list
        this.fetchPosts();
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }

  addPool() {
    // Initialiser nbr_like_post, nbr_signal_post, stat1 et stat2 à 0
    this.post.nbr_like_post = 0;
    this.post.nbr_signal_post = 0;
    this.post.stat1 = 0;
    this.post.stat2 = 0;
    this.postService.addPost(this.post).subscribe(
      (response) => {
        console.log('Post added successfully:', response);

       this.resetPostFields();
        // After adding, fetch posts again to update the list
        this.fetchPosts();
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
    // Autres traitements pour l'ajout du pool...
  }

  // Helper method to reset post fields
  resetPostFields() {
    this.post = {
      title_Post: '',
      description_Post: '',
      date_Post: new Date().toISOString(), // Reset date to current date and time
      nbr_like_post: 0,
      nbr_signal_post: 0,
      category_post: '',
      sondage1: '',
      sondage2: '',
      stat1: 0,
      stat2: 0
    };
  }

  posts: any[] = []; // Array to hold fetched posts

  fetchPosts() {
    // Call the getPosts function from ForumService to fetch posts
    this.postService.getPosts().subscribe(
      (response) => {
        // Assign fetched posts to the local array
        this.posts = response;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  deletePost(postId: number) {
    // Call the deletePost function from ForumService to delete the post
    this.postService.deletePost(postId).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
        // After deletion, fetch posts again to update the list
        this.fetchPosts();
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
